const   passport        = require('passport'),
        GoogleStrategy  = require('passport-google-oauth20'),
        User            = require('../models/user')

//DOT ENV
require('dotenv').config()

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL:'/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },async (accessToken,refreshToken,profile,done)=>{
        //passport callback function
        // console.log('====================')
        // console.log('Callback fired')
        // console.log('====================')
        // console.log(profile)

        //Check if User exists
        const existingUser = await User.findOne({google_id: profile.id})
        if (existingUser){
            console.log(`User Exists: ${existingUser.first_name}`)
        } else {
            console.log('No User Found')
            //Save to mongoDB REFACTORED
            const newUser = await User.create({
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                google_id: profile.id,
                picture_url: profile.photos[0].value,
            })
            console.log(`New user created: ${newUser}`)
        }
        //OLD CODE VID USES PROMISES AND IGNORES CREATE
        // const newUser = await new User({
        //     first_name: profile.name.givenName,
        //     last_name: profile.name.familyName,
        //     google_id: profile.id,
        //     picture_url: profile.photos[0].value,
        // }).save()
    })
)