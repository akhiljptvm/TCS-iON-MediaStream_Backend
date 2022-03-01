const express = require('express');
let app = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSignup = require('../models/adminSignup');

//add or signup new admin 
app.post('/', async function (req, res) {
  var User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
      Rights: req.body.Rights,
      repeatPass:req.body.repeatPass,
     creation_date:new Date()
  
  }
  var UserItem = new adminSignup(User);
  await UserItem.save().then(function (data) {
    res.send(true)
  }).catch(function (error) {
    res.send(false)
  });
});



//Admin login
app.post('/login', async function (req, res) {

    let email = req.body.email;
  let password = req.body.password;
  let username= req.body.username
    console.log(req.body)

    // mongo check for user
  let admin = await adminSignup.findOne({ 'email': email })
  let user = await adminSignup.findOne({'username':username})
 console.log(admin);
 bcrypt.compare(password,admin.password)
 .then((status)=>{
     if(status){
        let payload = {subject: admin.email,add:admin.add,delete:admin.delete,edit:admin.edit,superadmin:admin.superadmin,username}
        console.log("payload="+payload.subject)
        let token = jwt.sign(payload, 'secretKey')
        console.log("token="+token)
        res.send({token,add:admin.add,delete:admin.delete,edit:admin.edit,superadmin:admin.superadmin,username:admin.username})       
     }
     else{
         res.send(false);
     }  
    }) 
});



//admin list route
app.get('/AdminList', async function (req, res) {
    try{
   await adminSignup.find().sort({ firstname: -1 })
      .then(function (users) {
        res.send(users);
      });
    }catch(err){
        console.log("error response in AdminList"+err)
    }
  });
  

  //single admin
  app.get('/admindata/:id', async (req, res) => {
    try{
    const id = req.params.id;
   await adminSignup.findOne({ "_id": id })
        .then((admin) => {
            res.send(admin);
        });
    } catch (err) {
        console.log("error response in Singleadmin"+err)
    }
})


//Delete a admin from admin DB
app.post('/signup/remove', async (req, res) => {
  console.log(req.body);
  id = req.body._id
  console.log(` inside remove ${id}`);
  await adminSignup.findByIdAndDelete({ '_id': id },
    (err, result) => {
      if (err) {
        res.send(false)
      } else {
        res.send(true)
      }
    });
});

//Update admin data
app.post('/signup/update', async (req, res) => {


  let item = {
    username: req.body.username,
    email: req.body.email,
      password: req.body.password,
      repeatPass:req.body.repeatPass,
    Rights: req.body.Rights,
  }

  let id = req.body._id;
  let updateUser = { $set: item };
 await adminSignup.findByIdAndUpdate({ "_id": id }, updateUser)
    .then((respond) => {
      if (respond) {
        console.log('Admin Credential succesfully updated')
        res.send(true)
      }
      else {
        console.log('Connection error', error)
        res.send(false)
      }
    });
});

module.exports = app;