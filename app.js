const   express     = require('express'),
        app         = express()

app.set('view engine', 'ejs')

// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then(()=>{
//     console.log(`Mongoose Connected to: ${mongoose.connection.name}`)
// }).catch(err=>{
//     console.log(`Error: ${err.message}`)
// })

//ROUTES

app.get('/', (req,res)=>{
    res.render('home')
})


const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`CrossFit Virrey server started in: ${port}`))