var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

mongoose.Promise = Promise;

//Send Mail
module.exports.contactSend = function(req, res) {
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
  
  mailOpts = {
    from: 'contact@SwiftShare <swiftshareapp@gmail.com>',
    to: 'swiftshareapp@gmail.com',
    subject: 'Mail recieved from ' + req.body.email,
    html: "<p>Name: <strong>" + req.body.name + "</strong><br />Email: " +req.body.email + "</p><p><strong>Message</strong><br />" + req.body.message
  };
  
  transporter.sendMail(mailOpts, function(err, message){
    if(err){
      res.render('contact', { message: 'Oops, your message wasn\'t sent.', err: true});
    }
    else{
      res.render('contact',{ message: 'We recieved your message. We will reply back very soon.', err: false});  
    }
  });
}

module.exports.behind = function(req, res, next) {
  res.render('static', {description: "You upload a file and then a token will be generated associated with that file. Simply use that token in our print section and get your files."});
}

module.exports.faq = function(req, res, next) {
  res.render('static', {description: "FAQs coming soon"});
}

module.exports.contact = function(req, res, next) {
  res.render('contact');
}