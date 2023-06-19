const express = require("express");
const router = express.Router();
const ContactUS = require('../models/contactus');
const { User } = require('../models/user');

// Define the submitForm function separately
const submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if the email exists in the User collection
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Save the form data to the database
    const contactForm = new ContactUS({ name, email, message });
    await contactForm.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

// Use the submitForm function as the handler for the route
router.post('/submit-contact-form', submitForm);

module.exports = router;