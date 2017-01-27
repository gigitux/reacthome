var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.createConnection("mongodb://localhost:27017/myproject"));


var HomeSchema   = new Schema({
    title:  {
      type: String,
      required: true
    },
    description: String,
    id: Number,
    andress: String,
    photo: String,
    reserved: [
      {
      startDate: String,
      endDate: String,
      }
    ]
},
{ collection : 'Home'});
HomeSchema.plugin(autoIncrement.plugin, { model: 'Home', field: 'id' });
module.exports = mongoose.model('Home', HomeSchema);
