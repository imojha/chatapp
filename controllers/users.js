'use strict';

module.exports = function(_, passport, User){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage),
            router.get('/signup', this.signUpPage),
            router.get('/home', this.homePage),
            router.post('/signup', User.signUpvalidation , this.postSignUp)
            router.post('/', User.LoginValidation, this.postLogin)
        },

        indexPage: function(req, res){
            const errors = req.flash('errors');
            return res.render('index',{title: 'My Chat Application', messages: errors, hasErrors: errors.length > 0})
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: function(req, res){
            return res.render('home')
        },
        signUpPage: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {title: 'My Chat Application', messages: errors, hasErrors: errors.length > 0})
        },

        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
    }
}

