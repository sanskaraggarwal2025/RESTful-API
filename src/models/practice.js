const mongoose = require("mongoose");
const validator = require("validator");
const practiceSchema = new mongoose.Schema({
 name:{
  type:String,
  required:true,
  minlength:3
 },
 email: {
  type: String,
  required:true,
  unique:[true,"Email id is already present"],
  validate(value){
   if(!validator.isEmail(value)){
    throw new Error("Invalid Email");
   }
  }
 },
 Phone:{
  type: Number,
  min:10,
  required:true,
  unique:true
 },
 Address:{
  type:String,
  required:true,
 }
});
//creating a collection
const student = new mongoose.model("fun", practiceSchema);
module.exports = student;