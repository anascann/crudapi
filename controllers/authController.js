const express=require('express');
const bcrypt=require('bcryptjs');
const jsonwt=require('jsonwebtoken');
const passport=require('passport');
const key=require('../setup/mongourl');
const saltRounds = 10;

const router=express.Router();



const UserRegister=require('../models/UserRegister');
const controller={};



const ValidateEmail=(email)=>{
  
      if(typeof email !== "undefined" ){
          var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
          if(!pattern.test(email)){
              
              return "invalid";
          }else{
            
              return "valid";
          }
      }
}

controller.register=async(req,res)=>{
    
    if(ValidateEmail(req.body.email)!=='valid'){
  
        res.status(400).json({msg:"Invalid Email!"})
    }else if(req.body.password.length <6){
        res.status(400).json({msg:"password must be atleast 6 digits long"})
    }else{

 
        
    UserRegister.findOne({email: req.body.email})
    .then(person=>{
        if(person){
            return res.status(400).json({emailerror:'email is already registered'})
        }else{
       
            const newPerson=new UserRegister({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                
            })

            bcrypt.genSalt(saltRounds, (err, salt) =>{
                bcrypt.hash(newPerson.password, salt, (err, hash) =>{
                    // Store hash in your password DB.
                    if(err)throw err;
                   
                    newPerson.password=hash;
                    newPerson
                        .save()
                        .then(person=>res.json(person))
                        .catch(err=>console.log(err))
                });
            });
        }
    })
    .catch(err=>console.log(err));
}



}

controller.login=async(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;

    if(ValidateEmail(email)!=='valid'){
  
        res.status(400).json({msg:"Invalid Email!"})
    }else if(req.body.password.length <6){
        res.status(400).json({msg:"password must be atleast 6 digits long"})
    }else{

        UserRegister.findOne({email})
        .then(person=>{
            if(!person){
                return res.status(404).json({emailerror: 'user not found with this'})
            }

            bcrypt.compare(password,person.password)
                .then(isCorrect=>{
                    if(isCorrect){
                    //res.json({success: 'login successfully'})
                    const payload={
                        id:person.id,
                        name:person.name,
                        email:person.email
                    }
                    jsonwt.sign(
                        payload,
                        key.secret,
                        {expiresIn:3600},
                        (err,token)=>{
                            res.json({
                                success:true,
                                token:token,
                                data: payload
                            })
                        }
                    )
                }else{
                    res.status(400).json({passworderror:'login error password incorrect'})
                }})
                .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>console.log(err));

    }

    


}




module.exports=controller;