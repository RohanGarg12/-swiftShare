var express = require('express');
var router = express.Router();

//Require the token controller file
var ctrlToken = require('../controllers/ctrlToken');

router.post('/', ctrlToken.token);

module.exports = router;