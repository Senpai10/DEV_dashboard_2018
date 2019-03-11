const mongoose = require('mongoose');
const Widget = require('./widget')
var bcrypt = require('bcryptjs');
//mongoose.connect('mongodb://localhost/loginapp', {
//  useMongoClient: true
//});

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: String,
  email: String,
  name: String,
  google: {
      id: String,
      token: String,
      email: String,
      name: String
  },
  steam: {
      id: String,
      displayName: String,
      photos: String
  },
  github: {
    id: String,
    username: String,
    displayName: String,
    email: String,
    profile: String,
    photos: String
  },
  widgets: [Widget.schema]
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};