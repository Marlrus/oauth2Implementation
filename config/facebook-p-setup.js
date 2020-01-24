const   passport            = require('passport'),
        FacebookStrategy    = require('passport-facebook').Strategy
        User                = require('../models/user')

//DOT ENV
require('dotenv').config()

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'emails', 'name', 'likes']
    }, async (accessToken,refreshToken,profile,done)=>{
        console.log(profile._json.likes)
    })
)