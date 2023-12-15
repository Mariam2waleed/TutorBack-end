const express = require("express");
const router = express.Router();
const ContactUS = require('../models/contactus');
const {User} = require('../models/user');
const natural = require('natural');
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// Define the submitForm function separately
// Define the submitForm function separately
const submitForm = async (req, res) => {
    try {
        const {name, email, message} = req.body;

        // Check if the email exists in the User collection
        const existingUser = await User.findOne({email});
        if (! existingUser) {
            return res.status(400).json({message: 'User not found'});
        }

        // Convert the message string into an array of words
        const words = message.split(' ');

        // Perform sentiment analysis on the message
        const sentiment = analyzer.getSentiment(words);

        // Check if the sentiment is below a certain threshold to classify it as potential spam
        if (sentiment < -0.5) {
            return res.status(400).json({message: 'Potential spam detected'});
        }

        // Save the form data to the database
        const contactForm = new ContactUS({name, email, message});
        await contactForm.save();

        res.status(200).json({message: 'Form submitted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'An error occurred', error: error.message});
    }
};

// Use the submitForm function as the handler for the route
router.post('/submit-contact-form', submitForm);

module.exports = router;
