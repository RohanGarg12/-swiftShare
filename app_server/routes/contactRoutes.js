var express = require('express');
var router = express.Router();
var ctrlcontact = require('../controllers/contact');

router.get('/contact',  function(req,res){
  res.render('contact');
 });
router.post('/contactus', ctrlcontact.contactus);

module.exports = router;