const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://DesignFriend:DesignFriend@mediastreamingapp.tstbr.mongodb.net/MediaStreamingApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    name: String,
    email: String,
    password: String,
    repeatpassword: String,
    creation_date:Date
});

//  fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); 
    next();
  });
  

var UserData = mongoose.model('user',userSchema );

module.exports = UserData;