const { serializeUser } = require("passport");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("../lib/helpers");

passport.use(
  "local.signin",
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  }, async (req, username, password, done) => {
    // console.log(req.body)
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword) {
            console.log('   CLAVE VORRECTA EXCELENTE')
            done(null, user)
        } else {
            console.log('clave invalida por favor no sea w')
            done('CLAVE MALA1', false)
        }
    } else {
        done('CLAVE MALA2', false)
    }
  }
));

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { fullname } = req.body;
        const resultUsers = await pool.query("select * from users");

        if (resultUsers.length <= 0) {
          req.body.role = "admin";
        } else if (resultUsers.length > 0) {
          req.body.role = "user";
        }
        username = req.body.username;
        password = req.body.password;

        const pass = await helpers.encrypPassword(password);

        const result = await pool.query(
          "INSERT INTO users (fullname, username, password, role) VALUES (?, ?, ?, ?)",
          [fullname, username, pass, req.body.role]
        );
        const newUser = {
          id: result.insertId,
          username: username,
          password: pass,
          fullname: fullname,
          role: req.body.role,
        };
        console.log(newUser);
        // console.log(result);
        // res.json({'msg': 'joter'})
        return done(null, newUser);
      } catch (error) {
        console.error("paso algo rarisimo ptm");
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
