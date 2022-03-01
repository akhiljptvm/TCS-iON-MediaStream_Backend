const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://DesignFriend:DesignFriend@mediastreamingapp.tstbr.mongodb.net/MediaStreamingApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    
  username:String,
  email: String,
  password: String,
  repeatPass:String,
  Rights: String,
  creation_date:Date
});
//  fire a function before doc saved to db
adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); 
    next();
  });
  

var adminData = mongoose.model('admin', adminSchema);

module.exports = adminData;