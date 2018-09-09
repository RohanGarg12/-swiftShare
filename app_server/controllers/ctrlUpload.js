//Require Mongoose
var mongoose = require('mongoose');
var rStr = require('random-string');
var nodemailer = require('nodemailer');

mongoose.Promise = Promise;

//Create Mail Transporter
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: 'false',
  port: 25,
  auth: {
    user: 'swiftshareapp@gmail.com',
    pass: 'swiftShare07'
  },
  tls: {
    rejectUnauthorized: false
  }
});


//Require FileSystem and S3FS Library
var fs = require('fs');
var s3fs = require('s3fs'),
    s3fsImp = new s3fs('swiftshare/public/docs', {
      accessKeyId: 'AKIAI62TJEU76445FIIA',
      secretAccessKey: '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',
      signatureVersion: 'v4',
      region: 'ap-south-1'
    });

//Get the docs schema model
var doc = mongoose.model('docs');

//Send Response in JSON format
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Function to check if string already exists
function alreadyExists(val) {
  return new Promise((resolve, reject) => {
    doc.findOne({token: val}).exec(function(err, docObj){
      if(!docObj) resolve(0); //If token not found, resolve falsy value
      else if (err) reject(err) //If error reject
      else return resolve(1); //If token found, resolve truthy value
    });
  });
}

//Function to generate a random token
function generateDetails(req, res, linkValue, nameValue, emailValue) {
  var t = Math.floor((Math.random() * 8888) + 1111); //Generates number between 1000 and 9999
  alreadyExists(t).then(function(value) { //.then() waits for promise to resolve
    if(!value) {
      createDoc(req, res, t, nameValue, emailValue, linkValue);
    }
    else
      generateDetails(req, res, linkValue, nameValue, emailValue); //Call recursively again until unique token is generated
  }).catch(function(err) {
    console.log("Error:",err) //catch any thrown errors
  });
}


//Create the document using the previous values and save in the docs collection
function createDoc(req, res, tokenValue, nameValue, emailValue, linkValue) {
  doc.create({
    token: tokenValue,
    fileName: nameValue,
    createdOn: Date.now(),
    email: emailValue,
    fileLink: linkValue
  }, function(err, docsObj){
    if(err) {
      sendJsonResponse(res, 400, err);
    } else {
      if(emailValue) {
        var mailOptions = {
          from: 'SwiftShare App<swiftshareapp@gmail.com>',
          to: emailValue,
          subject: 'Token #' + tokenValue + ' generated on SwiftShare',
          html: '<p>Hello<br />Thank you for using SwiftShare</p><p>Here is your token #<strong>' + tokenValue + '</strong> generated for the file "<strong>' + nameValue + '</strong>" on SwiftShare.<br />Use this token at Swift Share website or click on this <a href="www.swiftshare.in/share?token=' + tokenValue + '">link</a> to get the files.</p><p>Kindly use this token to <strong>download your files within 7 days</strong></p>Regards<br />SwiftShare Team</p>'
        };
        transporter.sendMail(mailOptions, function(err, data) {
          if(err) console.log('Failed to send Mail.');
        });
      }
      res.redirect('/share?token='+tokenValue);
    }
  });
}

//Exported Upload function
module.exports.upload = function(req, res) {
  var file = req.files.fileInput; //Requests the file
  
  //Changing file name to file Name
  file.name = file.name.split(".");
  var ext = file.name.pop();
  file.name = file.name.join(".") + "-" + rStr() + "." +ext;
  
  //Getting Email Value
  var emailValue = req.body.email || '';
  
  var stream = fs.createReadStream(file.path); //Prepares a read stream on a temp path in system
  
  if(file.size <= 10*1024*1024) {
    //Uploads the file to S3 server and unlinks the temp stream
    return s3fsImp.writeFile(file.name, stream).then(function(){
      console.log(file.path);
      fs.unlink(file.path, function(err) {
        if(err) console.error(err);
        else console.log("Unlinked");
      });

      //Values for docs schema
      var linkValue = 'https://s3.ap-south-1.amazonaws.com/swiftshare/public/docs/' + file.name; //The former string is constant, add filename to it to get a link value
      var nameValue = file.originalFilename; //The original file name

      generateDetails(req, res, linkValue, nameValue, emailValue);    
    });
  } else {
    sendJsonResponse(res, 400, "Error 400: The File Size Limit exceeded 10 MB. We are sorry for this inconvenience.");
  }
};