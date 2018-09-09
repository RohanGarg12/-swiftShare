var mongoose = require('mongoose');
var doc = mongoose.model('docs');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.send(content);
};

module.exports.token= function(req,res){
  console.log('Inside: ' + req.body.token);
  if( req.body.token ) {
    //Search for the token in database
    doc.findOne({token: req.body.token}).exec(function(err, docs) {
      if(!docs) {
        sendJsonResponse(res, 404, {});
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      
      //Get data from the docs Object
      var fileLink = docs.fileLink;
      var fileName = docs.fileName;
      
      //Render the download page with the link
      //res.render('download', {fileLink: fileLink, fileName: fileName});
      sendJsonResponse(res, 200, {"name": fileName, "link": fileLink});
    });
  }else{
    sendJsonResponse(res, 404, "Not a valid Token");
  }
};