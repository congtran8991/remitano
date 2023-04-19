const mongoose = require('mongoose')
const schema = mongoose.Schema;
const login = new schema({
    email : {
        type: String,
        required: true
    },
    passWord:{
        type : String,
        required:true
    }
   
})
module.exports=mongoose.model('user',login);