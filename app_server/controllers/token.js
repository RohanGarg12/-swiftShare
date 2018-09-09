var mongoose = require('mongoose');
var doc = mongoose.model('docs');
var fileLocation,fileName;

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.send(content);
};

module.exports.token= function(req,res){
  if( req.body.token ) {
    doc.findOne({token: req.body.token}).exec(function(err, docs) {
     if(!docs) {
       sendJsonResponse(res, 404, "token not found");
       return;
     }else if (err) {
       sendJsonResponse(res, 404, err);
       return;
     }
     fileLocation= docs.fileLink;
     fileName= docs.fileName;
     res.render('download', {fileLocation: fileLocation,fileName: fileName});
   });
  }else{
     sendJsonResponse(res, 404, "No token in request");
}};


