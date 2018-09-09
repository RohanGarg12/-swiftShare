var nodemailer= require('nodemailer');

module.exports.contactus= function(req,res){
  var mailopts,smtpTrans;
  smtpTrans =nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: "swiftshareapp@gmail.com",
      pass: "swiftShare07"
    }
  });
  //Mail Options
  mailopts = {
    from: req.body.name + req.body.email,
    to: 'swiftshareapp@gmail.com',
    subject: req.body.email,
    text: "Name: " + req.body.name + " Email: " +req.body.email + " Message: " + req.body.message
  };
  smtpTrans.sendMail(mailopts, function(error,message){
    if(error){
      res.render('contact',{ msg : 'Error occured, message not sent', err: true});
    }
    else{
      res.render('contact',{ msg: 'Message  sent! Thank you.', err: false});  
    }
  smtpTrans.close();
  });
};