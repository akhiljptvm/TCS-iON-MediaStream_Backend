const express=require('express');
const app =  express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const path = require('path');

// app.use(express.static('./dist/FrontEnd'));

var port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); //middleware portion for adding data
app.use(cors());


app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/FrontEnd//index.html'));
// });
app.get('/', function (req, res) {
    res.send(`<center><h1>Server Running Successfully</h1></center>`)
    
})

// Route for Video upload
const VideoUpload = require('./src/routes/upload');
app.use('/upload', VideoUpload)

//Review Routes
const Review = require('./src/routes/review');
app.use('/review',Review)

//Login Routes
const Login = require('./src/routes/signin');
app.use('/user',Login)


// port listening to starts here//
app.listen(port, () => {
    console.log("Server ready at" + port);
});
// port listening to ends here//