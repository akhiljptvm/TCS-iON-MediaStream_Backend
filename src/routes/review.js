const express = require('express');
const app = express.Router();
const reviewData = require('../models/reviewData')


//review List View ||to admin 
app.get('/', function (req, res) {

    reviewData.find().sort({ index: 1 })
        .then(function (upData) {
            res.send(upData);
        });
});


//Single review route
app.get('/review/:id', async (req, res) => {
    console.log("inside")
    try{
    const id = req.params.id;
    await reviewData.findOne({ "_id": id })
   
        .then((viduploads) => {
            console.log(viduploads._id);
            res.send(viduploads);
        });
    } catch (err) {
        console.log("error response in CourseTestinomy"+err)
    }
})

//Add review data ||to admin
app.post('/add', async function (req, res) {
    var videoUpload = {
        caption: req.body.caption,
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating,
        creation_date: new Date()
          
    }
    var vidUpload = new reviewData(videoUpload);
    await vidUpload.save().then(function (data) {
        res.send(data);
    }).catch(function (error) {
        res.send(false);
    });

});

//Delete review data ||to admin
app.post('/review/remove',async (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside deleted ${id}`);
    reviewData.findByIdAndDelete({ '_id': id },
    (err, result) => {
        if (err) {
            res.send(false)
        } else {
            res.send(true)
        }
    });
});

//Update/edit review data
app.post('/review/update', (req, res) => {

    var videoUpload = {
        caption: req.body.caption,
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating,
        creation_date: new Date()
    }

    let _id = req.body._id;
    let updated = { $set: videoUpload };

    reviewData.findByIdAndUpdate({ _id: _id }, updated)
        .then((respond) => {
            if (respond) {
                console.log('Successfully Updated and saved to DB')
                res.send(true)
            }
            else {
                console.log('update failed,try again', error)
                res.send(false)
            }
        });

});



module.exports = app;   