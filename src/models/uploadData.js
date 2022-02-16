const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://DesignFriend:DesignFriend@mediastreamingapp.tstbr.mongodb.net/MediaStreamingApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
    
    videoTitle: String,
    video: String,
    thumbnail: String,
    description: String,
    tags: String,
  genre: String,
  releaseYear: String,
  subtitle: String,
  quality: String,
  genre:String,
  creation_date: Date
});

var uploadData = mongoose.model('videoUpload', uploadSchema);

module.exports = uploadData;