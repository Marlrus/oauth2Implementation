const   passport        = require('passport'),
        GoogleStrategy  = require('passport-google-oauth20'),
        User            = require('../models/user')

//DOT ENV
require('dotenv').config()

//Serialize Stuff into cookie
passport.serializeUser((user, done)=>{
    done(null,user._id);
})

//Desirialize Find user based on cookie
passport.deserializeUser(async (_id, done)=>{
    const foundUser = await User.findById(_id)
    done(null,foundUser)
})

//Refactored to use async instead of promises and callbacks
passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL:'/auth/google/redirect',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },async (accessToken,refreshToken,profile,done)=>{
        //Check if User exists
        const existingUser = await User.findOne({external_id: profile.id})
        //Handle User existance
        if (existingUser){
            // console.log(profile)
            console.log(`User Exists: ${existingUser.first_name}`)
            //Add email to existing user
            if (!existingUser.email) {
                console.log('Email not found, adding email')
                existingUser.email = profile._json.email
                await existingUser.save()
                console.log(`Added email: ${existingUser.email}`)
            }
            done(null,existingUser)
        } else {
            console.log('No User Found')
            console.log(profile)
            //Save to mongoDB REFACTORED
            const newUser = await User.create({
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                external_id: profile.id,
                picture_url: profile._json.picture,
                email: profile._json.email,
                google_login: true
            })
            console.log(`New user created: ${newUser}`)
            done(null,newUser)
        }
    })
)