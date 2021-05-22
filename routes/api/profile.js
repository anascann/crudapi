// const express=require('express');
// const router=express.Router();
// const mongoose=require('mongoose');
// const passport=require('passport');

// const Person=require("../../models/Person");
// const Profile=require("../../models/Profile");

// router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
// Profile.findOne({user: req.user.id})
//     .then(profile=>{
//         if(!profile){
//             return res.status(404).json({profilenotfound: "No profile found"})
//         }

//         res.json(profile);
//     })
//     .catch(err=>console.log('got some error in profile'+err))
// })

// router.post(
//     '/',
//     passport.authenticate("jwt",{session:false}),(req,res)=>{
//         const profilevalues={};
//         profilevalues.user=req.user.id;
//         if(req.body.username)profilevalues.username=req.body.username;
//         if(req.body.website)profilevalues.website=req.body.website;
//         if(req.body.country)profilevalues.country=req.body.country;
//         if(req.body.portfolio)profilevalues.portfolio=req.body.portfolio;
//         if(typeof req.body.languages !==undefined){
//             profilevalues.languages=req.body.languages.split(',');
//         }

//         profilevalues.social={};
//         if(req.body.youtube)profilevalues.social.youtube=req.body.youtube;
//         if(req.body.instagram)profilevalues.social.instagram=req.body.instagram;
//         if(req.body.facebook)profilevalues.social.facebook=req.body.facebook;

//         Profile.findOne({user: req.user.id})
//             .then(profile=>{
//                 if(profile){
//                     Profile.findOneAndUpdate(
//                         {user:req.user.id},
//                         {$set: profilevalues},
//                         {new:"true"}
//                     )
//                     .then(profile=>res.json(profile))
//                     .catch(err=>console.log('problem in update '+err));
//                 }else{
//                     Profile.findOne({username:profilevalues.username})
//                     .then(profile=>{
//                         if(profile){
//                             res.status(400).json({username:'Username Already exists'})

//                         }

//                         new Profile(profilevalues)
//                         .save()
//                         .then(profile=>{
//                             res.json(profile)
//                         })
//                         .catch(err=>console.log(err));
//                     })
//                     .catch(err=>console.log(err))
//                 }
//             })
//                 .catch(err=>console.log('Problem in fethcing '+ err));


//     }
// )

// router.get('/:username',(req,res)=>{
//     Profile.findOne({username:req.params.username})
//     .populate("user",["name","profilepic"])
//     .then(profile=>{
//         if(!profile){
//             res.status(404).json({usernotfound:'user not found'})
//         }
//         res.json(profile);
//     })
//     .catch(err=>console.log('error in fetching username '+err))
// })

//     router.delete('/',
//     passport.authenticate('jwt',{session:false}),(req,res)=>{
//         Profile.findOne({user:req.user.id})
//         Profile.findOneAndRemove({user:req.user.id})
//             .then(()=>{
//                 Person.findOneAndRemove({_id:req.user.id})
//                 .then(()=>{
//                     res.json({success:'delete was a success'})
//                 })
//                     .catch(err=>console.log(err))
//             })
//                 .catch(err=>console.log(err))
//     })

//     router.post('/mywork',passport.authenticate('jwt',{session:false}),(req,res)=>{
//         Profile.findOne({user:req.user.id})
//         .then(profile=>{
//             if(!profile){
//                 res.status(404).json({usernotfound:'not found'});
//             }

//             const newWork={
//                 role:req.body.role,
//                 company: req.body.company,
//                 country: req.body.country,
//                 from: req.body.from,
//                 ro:req.body.to,
//                 current: req.body.current,
//                 details:req.body.details
//             };

//             profile.workrole.push(newWork);
//             profile.save()
//             .then(profile=>res.json(profile))
//                 .catch(err=>console.log(err))

//         })
//             .catch(err=>console.log(err))
//     }

//     )

//     router.delete('workrole/:w_id',
//     passport.authenticate('jwt',{session:false}),(req,res)=>{
//         Profile.findOne({user:req.user.id})
//         .then(profile=>{
//             if(!profile){
//                 res.status(404).json({usernotfound:'Not found'});
//             }

//             const removethis=profile.workrole
//             .map(item=>item.id)
//             .indexOf(req.params.w_id);

//             profile.workrole.splice(removethis,1);

//             profile.save()
//             .then(profile=>res.json(profile)).catch(err=>console.log(err))


//         })
//             .catch(err=>console.log(err))
//     })



// module.exports=router;