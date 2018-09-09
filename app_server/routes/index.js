var express = require('express');
var router = express.Router();

var ctrlStatic = require('../controllers/ctrlStatic');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/behind', function(req, res) {
  res.render('behind');
});

router.get('/faq', function(req, res) {
  res.render('faq');
});

router.get('/share', function(req, res) {
  res.render('share', {token: req.query.token});
});

router.get('/contact', ctrlStatic.contact);
router.post('/contact/send', ctrlStatic.contactSend);

module.exports = router;
