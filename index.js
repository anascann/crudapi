require("dotenv").config();
const express=require('express')
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const auth=require('./routes/api/auth')
// const profile=require('./routes/api/profile');
// const questions=require('./routes/api/questions');
const User=require('./routes/api/user')
const passport=require('passport');
var helmet = require('helmet')
const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(helmet())

const db=require('./setup/mongourl').mongoURL

mongoose.connect(db,{
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(()=>{
    console.log('mongo Connected')
}).catch(err=>{
    console.log(err)
});

app.use(passport.initialize());

require('./strategies/jsonwtStrategies')(passport);

app.use('/api/auth',auth);

// app.use('/api/profile',profile);
// app.use('/api/questions',questions);
app.use('/api',User);
const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>{
    console.log('server is up');
})