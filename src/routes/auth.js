
module.exports = {
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        return res.json('no estas logeado')
    },
    isNotLoggedIn(req, res, next) {
        if(!req.isAuthenticated()){
            return next()
        }
        return res.send('EXITO LOGEADO CORRECTAMENTE')
    }
}