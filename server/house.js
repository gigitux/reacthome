var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HomeSchema   = new Schema({
    title: String,
    id: String,
    description: String,
    andress: String,
    photo: String
},
{ collection : 'Home'});

module.exports = mongoose.model('Home', HomeSchema);
