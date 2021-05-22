const User=require('../models/User');

const controller={};

controller.addUser=async(req,res)=>{

   await User.findById({_id: req.body.id}).then(user=>{
        if(!user){
            const newUser=new User({
                _id: req.body.id,
                name:req.body.name,
                dob: req.body.dob,
                address: req.body.address,
                description: req.body.description
            })

            newUser
                .save()
                    .then(response=>{
                        res.status(200).json({msg:"data saved"});
                    })
                        .catch(err=>res.status(400).json({msg: "error saving user"}));
        }else{
            res.status(400).json({msg:'data already exists'})
        }
    })


}

controller.getUser=async(req,res)=>{
    
   await User.findById({_id: req.query.id}).then(user=>{
       console.log(user)
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({msg:'user not found'});
        }
    })
}

controller.updateUser=async(req,res)=>{
  try{
    const updatedResult=  await User.findByIdAndUpdate({_id: req.query.id}, req.body, {
        new: true
    });

    res.status(200).json(updatedResult)
  }catch(err){
    res.status(400).json(err)
  }

}
   


controller.deleteUser=async(req,res)=>{
   try{
    const res=  await User.findByIdAndDelete({_id: req.query.id});
    console.log(res)
    res.status(200).json({msg:"deleted successfully"});
   }catch(err){
    res.status(500).json(err)
   }
}

module.exports=controller;