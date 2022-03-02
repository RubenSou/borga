const httpErrors = require('./errors/http-errors')
const expressSession = require('express-session')
const passport = require('passport')

module.exports = function(app, router, services){
    
    app.use(expressSession({secret : 'PI 2021', resave : true, saveUninitialized : true}))
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))

    router.get('/login', getLogin)
    router.get('/profile', getProfile)
    router.post('/login', postLogin)
    router.post('/logout', logout)

    
    return router

    function getLogin(req, resp){
        resp.render('login')
    }

    function getProfile(req,resp){
        const userInfo = {token: req.user.token, username : req.user.userName, usermail : req.user.email}
        resp.render('profile', {profile : userInfo, username : userInfo.username })
    }

    function postLogin(req, resp){
        const username = req.body.username
        const password = req.body.password
        services
            .validateUser(username, password)
            .then(user => {
                return login(req,user)})
            .then(()=>resp.redirect('/'))    
            .catch(()=>resp.status(401).render('page-not-found'))
    }

    function logout(req, resp){
        req.logout()
        resp.redirect('/')
    }

    function login(req, user){
        return new Promise((resolve,reject) => {
            req.login(user, (error, result) =>{
                if(error) reject(error)
                else resolve(result)
            })
        })
    }
    
}