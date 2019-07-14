let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    location: String,
    pic: String
});

module.exports = mongoose.model('UserModel', userSchema);