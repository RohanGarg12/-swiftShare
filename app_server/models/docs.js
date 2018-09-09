var mongoose = require('mongoose');

var docsSchema = new mongoose.Schema({
  token: {type: Number, required: true},
  fileName: {type: String, required: true},
  createdOn: {type: Date, "default": Date.now},
  email: {type: String},
  fileLink: {type: String,required: true}  
});

docsSchema.index({"createdOn": 1}, {expireAfterSeconds: 604800});
var docsModel = mongoose.model('docs', docsSchema);