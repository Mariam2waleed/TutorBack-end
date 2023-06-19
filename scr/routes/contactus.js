const express = require("express");
const router = express.Router();
const ContactUS = require('../models/contactus');
const submitForm  = require('../logic/contactus');

router.post('/submit-contact-form', submitForm ); 

module.exports = router;