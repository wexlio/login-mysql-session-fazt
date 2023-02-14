const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const passport = require('passport')
const session = require('express-session')
const mysqlStore = require('express-mysql-session');
const { database } = require("./keys");

//initializations
const app = express();
require('./lib/passport')

//setting

app.set("port", process.env.PORT || 7000);

//middelwares
app.use(session({
  secret:'fazt',
  resave: false,
  saveUninitialized: false,
  store: new mysqlStore(database),
  cookie: {
    secure: false,  // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie
    maxAge: 60000, // session max age in milliseconds
  },
}))
app.use(morgan("dev"));
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

//Global variables
app.use((req, res, next) => {
  app.locals.user = req.user
    next()
})

//Routes
app.use(require("./routes/index.js"));
app.use(require("./routes/users.js"));
app.use(require("./routes/authentication"));
app.use("/tasks", require("./routes/tasks"));

//Public

//Starting Serer
app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});
