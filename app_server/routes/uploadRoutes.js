var express = require('express');
var router = express.Router();

//Requires the upload controller
var ctrlUpload = require('../controllers/ctrlUpload');

//Requires the multiparty controllers
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

//Use the multiparty middleware
router.use(multipartyMiddleware);

//Render the uploadView.pug file for upload/ URI
router.get('/', function(req, res) {
  res.render('upload.pug');
});

//Execute the upload controller for upload/u URI
router.post('/u', ctrlUpload.upload);

//Export the router for app.js
module.exports = router;