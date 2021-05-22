const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required: true
    },

    dob:{
        type: Date,
        default: null
    },

    address:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports=User=mongoose.model('User',UserSchema);