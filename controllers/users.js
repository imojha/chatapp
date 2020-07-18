'use strict';

module.exports = function(_){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage),
            router.get('/signup', (req, res) => {
                return res.render('signup');
            })
        },

        indexPage: function(req, res){
            return res.render('index', {msg: 'This is a test message'})
        },
    }
}

