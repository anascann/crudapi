const express=require('express');
const router=express.Router();

const passport=require('passport');
const controller = require('../../controllers/userController')

//router.get('/',(req,res)=>{res.json({test:"user route working"})});

router.post('/user', passport.authenticate('jwt',{session:false}) ,async(req,res)=>{
        try{
           
            await controller.addUser(req,res);
        }catch(err){
            res.status(400).json(err);
        }
})

router.get('/user', passport.authenticate('jwt',{session:false}) ,async(req,res)=>{
    try{
        await controller.getUser(req,res);
    }catch(err){
        res.status(400).json(err);
    }
})

router.patch('/user', passport.authenticate('jwt',{session:false}) ,async(req,res)=>{
    try{
        await controller.updateUser(req,res);
    }catch(err){
        res.status(400).json(err);
    }
})

router.delete('/user', passport.authenticate('jwt',{session:false}) ,async(req,res)=>{
    try{
        await controller.deleteUser(req,res);
    }catch(err){
        res.status(400).json(err);
    }
})

module.exports=router;