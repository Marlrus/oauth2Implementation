const   passport            = require('passport'),
        FacebookStrategy    = require('passport-facebook').Strategy
        User                = require('../models/user')

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

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id','name','name_format','short_name','email']
    }, async (accessToken,refreshToken,profile,done)=>{
        //Check for user
        const existingUser = await User.findOne({external_id: profile._json.id})
        //Handle User existance
        if(existingUser){
            // console.log(profile)
            console.log(`User Exists: ${existingUser.first_name}`)
            done(null,existingUser)
        }else{
            console.log('No User Found')
            console.log(profile)
            //Save to mongoDB
            const newUser = await User.create({
                first_name: profile._json.first_name,
                last_name: profile._json.last_name,
                external_id: profile._json.id,
                email: profile._json.email,
                facebook_login: true
            })
            console.log(`New user created: ${newUser}`)
            done(null,newUser)
        }
    })
)