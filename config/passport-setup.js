const   passport        = require('passport'),
        GoogleStrategy  = require('passport-google-oauth20')

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })
    // .()=>{
    //     //passport callback function
    // })
)