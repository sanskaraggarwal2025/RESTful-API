const express = require("express");
const app = express();
require("./db/conn.js");
const student = require("./models/practice");
const port = process.env.PORT || 3000;

// app.get("/", (req,res) =>{
//  res.send("hello I am sanskar aggarwal");
// })

app.use(express.json());

//creating the data using promises
// app.post("/students",(req,res) =>{
//  console.log(req.body);
//  const user = new student(req.body);
//  user.save().then(()=>{
//   res.status(201).send(user);
//  }).catch((e) =>{
//   res.status(400).send(e);
//  })
// })


//creating the data using async await
app.post("/students", async (req, res) => {
 try {
  const user = new student(req.body);
  const createUser = await user.save();
  res.status(201).send(createUser);
 } catch (e) { res.status(400).send(e); }
})

//reading the data
app.get("/students", async (req, res) => {
 try {
  const studentsData = await student.find();
  res.send(studentsData);
 } catch (e) {
  res.send(e);
 }
})

// reading the individual student data
app.get("/students/:id", async (req, res) => {
 try {
  const _id = req.params.id;
  const studentData = await student.findById(_id);

  if (!studentData) {
   return res.status(404).send();
  } else {
   res.send(studentData);
  }
 } catch (e) {
  res.status(500).send(e);
 }
})

// update the students by it id
app.patch("/students/:id", async (req, res) => {
 try {
  const _id = req.params.id;
  const updateStudents = await student.findByIdAndUpdate(_id, req.body, {
   new: true
  });
  res.send(updateStudents);
 } catch (e) {
  res.status(404).send(e);
 }
})


//delete the student by it id
app.delete("/students/:id", async (req, res) => {
 try {
  const deleteStudent = await student.findByIdAndDelete(req.params.id);
  if (!req.params.id) {
   return res.status(400).send();
  }
  res.send(deleteStudent);
 } catch (e) {
  res.status(500).send(e);
 }
})



app.listen(port, () => {
 console.log(`Connection is setup at ${port}`)
})

