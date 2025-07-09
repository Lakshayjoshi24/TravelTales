const mongoose=require("mongoose");
const schema=mongoose.Schema;  //Imports Mongoose and extracts the Schema constructor. Schema defines the structure of documents inside a MongoDB collection.

const userSchema=new schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    createdOn:{type:Date, default:Date.now}
})

module.exports=mongoose.model("User",userSchema);