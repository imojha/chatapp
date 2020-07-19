'use strict';

// const { isEmpty } = require("lodash");

module.exports = function(){
    return{
        signUpvalidation: (req, res, next) => {
            req.checkBody('email', 'Email is invalid').isEmail();
            req.checkBody('email', 'Email can\'t be isEmpty.').notEmpty();
            req.checkBody('name', 'Name can\'t be empty.').isEmpty();
            req.checkBody('Password', 'Password can\'t be empty.').isEmpty();

            
            req.getValidationResult()
                .then(result => {
                    const error = result.array();
                    const messages = [];
                    error.forEach(error => messages.push(error.msg))
                    req.flash('error', messages)
                    res.redirect('/signup')
            })
                .catch(err => next())


            },
            LoginValidation: (req, res, next) => {
                req.checkBody('email', 'Email is invalid').isEmail();
                req.checkBody('email', 'Email can\'t be isEmpty.').notEmpty();
                req.checkBody('Password', 'Password can\'t be empty.').isEmpty();
    
                
                req.getValidationResult()
                    .then(result => {
                        const error = result.array();
                        const messages = [];
                        error.forEach(error => messages.push(error.msg))
                        req.flash('error', messages)
                        res.redirect('/')
                })
                    .catch(err => next())
    
    
                }
    
        }

    }

