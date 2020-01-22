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
    },()=>{
        //passport callback function
    })
)