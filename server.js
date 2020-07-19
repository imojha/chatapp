const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const http = require('http')
const cookieParser = require('cookie-parser')
const validator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const flash = require('connect-flash')


const container = require('./container')
const passport = require('passport')


container.resolve(function(users, _){
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/mydb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })    
        .then((result) => console.log("Database connected successfully.."))
        .catch(err => console.log(err.message))

    const app = SetUpExpress();
    function SetUpExpress(){
        const app = express();
        const server = http.createServer(app);
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

        ConfigureExpress(app);


        // Setup Router

        const router = require('express-promise-router')();
        users.SetRouting(router)
    
        app.use(router)

    }


    function ConfigureExpress(app){
        require('./passport/passport-local');
        app.use(express.static('public'))
        app.use(cookieParser());
        app.set('view engine', 'ejs')
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(validator())
        app.use(session({
            secret: 'MySecretKey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }))

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _

    }


})