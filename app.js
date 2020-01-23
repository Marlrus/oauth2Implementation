const   express         = require('express'),
        app             = express(),
        passportSetup   = require('./config/passport-setup'),
        mongoose        = require('mongoose')


//DOT ENV
require('dotenv').config()
//ROUTES

const   authRoutes   = require('./routes/auth-routes')

//set up view engine
app.set('view engine', 'ejs')

// set up routes
app.use('/auth',authRoutes)

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
    res.render('home')
})


const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`CrossFit Virrey server started in: ${port}`))