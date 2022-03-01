const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://DesignFriend:DesignFriend@mediastreamingapp.tstbr.mongodb.net/MediaStreamingApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    
    caption: String,
    name: String,
    review: String,
    rating: String,
    creation_date:Date
});

var reviewData = mongoose.model('review', reviewSchema);

module.exports = reviewData;