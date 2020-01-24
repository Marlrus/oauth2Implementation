const   router      = require('express').Router({mergeParams: true}),
        passport    = require('passport')

//Auth Login

router.get('/login', (req,res)=>{
    res.render('login')
})
//Auth Logout

router.get('/logout',(req,res)=>{
    //handle with passport
    req.logout()
    res.redirect('/')
})


//Auth with google GO TO CONSENT SCREEN
router.get('/google',passport.authenticate('google',{
    //Add , in the array if you want any other info from google
    scope: ['profile','email']
}))

//Google Redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
    // res.send(req.user)
    res.redirect('/profile')
})

module.exports = router