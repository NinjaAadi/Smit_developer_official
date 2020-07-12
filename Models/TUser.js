const mongoose = require('mongoose');
const TuserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'Please add a firstname']
    },
    lastname:{
        type:String,
        required:[true,'Please add a lastname']
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minlength:6
    },
    email:{
        type:String,
        required:true
    },
    emailverificationcode:{
        type:String,
    },
    emailverificationExpire:{
        type:Date
    },
    createdat:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('tusers',TuserSchema);