const express=require('express');

const passport=require('passport');

const router=express.Router();
const controller = require('../../controllers/authController')
router.get('/',(req,res)=> res.json({test:'Auth is active'}));


router.post('/register', async(req,res)=>{

try{
    console.log('register')
    await controller.register(req,res);
}catch(err){
    res.status(400).json(err)
}

})

router.post('/login',async(req,res)=>{
   

        try{
            await controller.login(req,res);
        }catch(err){
            res.status(400).json(err);
        }
})

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,
        gender: req.user.gender,
        profilepic: req.user.gender ? 'https://pixabay.com/photos/ballet-dancer-oudoors-elegant-5415806/':'girl link'
    })
})



module.exports=router;