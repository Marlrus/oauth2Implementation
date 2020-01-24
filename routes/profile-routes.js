const router = require('express').Router()

//Middleware
const authCheck = (req,res,next) => {
    if(req.user){
        next()
    } else {
        //if user is not logged in
        res.redirect('/auth/login')
    }
}

router.get('/', authCheck, (req,res)=>{
    res.send('PROFILE ' + req.user.first_name)
})

module.exports = router