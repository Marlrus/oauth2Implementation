const   passport        = require('passport'),
        GoogleStrategy  = require('passport-google-oauth20')

//DOT ENV
require('dotenv').config()

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL:'/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        console.log('Callback fired')
        console.log(profile)
    })
)