const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
//const Person=mongoose.model("myPerson");
const myKey=require('../setup/mongourl');
const passport = require('passport');
const UserRegister= require('../models/UserRegister')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = myKey.secret;

module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        UserRegister.findById(jwt_payload.id)
        .then(
            person=>{
                if(person){
                    return done(null,person);
                }
                return done(null,false);
            }
        )
        .catch(err=>console.log(err));
    }))
}

