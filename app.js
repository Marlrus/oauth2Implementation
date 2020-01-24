const   express         = require('express'),
        app             = express(),
        passport        = require('passport')
        passportSetup   = require('./config/passport-setup'),
        facebookPSetup   = require('./config/facebook-p-setup'),
        mongoose        = require('mongoose'),
        cookieSession   = require('cookie-session')
        // {google}        = require('googleapis')


//DOT ENV
require('dotenv').config()

//ROUTES
const   authRoutes      = require('./routes/auth-routes')
        profileRoutes   = require('./routes/profile-routes')

//set up view engine
app.set('view engine', 'ejs')

//Cookie Session setup
app.use(cookieSession({
    //t in ms
    maxAge: 24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}))

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//LOCALS
app.use((req,res,next)=>{
    res.locals.user = req.user
    // res.locals.error = req.flash('success')
    next()
})

// set up routes
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log(`Mongoose Connected to: ${mongoose.connection.name}`)
}).catch(err=>{
    console.log(`Error: ${err.message}`)
})

//ROUTES

app.get('/', (req,res)=>{
    // console.log(google)
    // console.log(req.user)
    res.render('home')
})


const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`CrossFit Virrey server started in: ${port}`))