const router = require('express').Router({mergeParams: true})

//Auth Login

router.get('/login', (req,res)=>{
    res.render('login')
})
//Auth Logout

router.get('/logout',(req,res)=>{
    //handle with passport
    res.send('Loging out')
})


//Auth with google
router.get('/google', (req,res)=>{
    //handle with passport
    res.send('logging in with google')
})

module.exports = router