const express = require('express');
const app = express.Router();
const userData = require('../models/userSignup')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//UserSignup 
app.post('/', async function (req, res) {
    var User = {
      name: req.body.name,
      password: req.body.password,
      repeatpassword: req.body.repeatpassword,
      email: req.body.email,
       creation_date: new Date(),
    }
    var UserItem = new userData(User);
    await UserItem.save().then(function (data) {
      res.send(data)
    }).catch(function (error) {
      res.send(false)
    });
  });
  

//userLogin route
app.post('/userLogin', async function (req, res) {
    console.log("vannitunde")
   
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)

//     let user = await userData.findOne({ email });
//     if (!user) return res.status(400).send("user not found")
//     const validPassword = await userData.findOne({ password })
//     if (!validPassword) return res.status(400).send("pleasse enter a valid password")
//     user.password = undefined;
//     res.send(user);
// }catch (err) {
//        console.log(err);
//        res.status(500).send("something went wrong")
//    }
let user= await userData.findOne({'email': email})
console.log(user);
    // mongo check for user
    bcrypt.compare(password,user.password)
    .then((status)=>{
        if(status){
           let payload = {subject: user.email,add:user.add,delete:user.delete,edit:user.edit,superadmin:user.superadmin}
           console.log("payload="+payload.subject)
           let token = jwt.sign(payload, 'secretKey')
           console.log("token="+token)
           res.send({token,add:user.add,delete:user.delete,edit:user.edit,superadmin:user.superadmin})       
        }
        else{
            res.send(false);
        }  
       }) 
   });
   

//user list route
app.get('/userList', async function (req, res) {
    try{
   await userData.find().sort({ firstname: -1 })
      .then(function (users) {
        res.send(users);
      });
    }catch(err){
        console.log("error response in userList"+err)
    }
  });
  
//Remove a user from admin DB
app.post('/signup/remove', async (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside remove ${id}`);
    await userData.findByIdAndDelete({ '_id': id },
      (err, result) => {
        if (err) {
          res.send(false)
        } else {
          res.send(true)
        }
      });
  });
  
  //Update User
  app.post('/signup/update', async (req, res) => {
  
  
    let item = {
        name: req.body.username,
        password: req.body.password,
        repeatpassword: req.body.repeatpassword,
        email: req.body.email,
        creation_date: new Date(),
    }
  
    let id = req.body._id;
    let updateUser = { $set: item };
   await userData.findByIdAndUpdate({ "_id": id }, updateUser)
      .then((respond) => {
        if (respond) {
          console.log('user Credential succesfully updated')
          res.send(true)
        }
        else {
          console.log('Connection error', error)
          res.send(false)
        }
      });
  });



module.exports = app;   