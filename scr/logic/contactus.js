const ContactUS = require('../models/contactus');

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../auth/verifytoken');



app.post('/submit-contact-form', async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Save the form data to the database
      const contactForm = new ContactForm({ name, email, message });
      await contactForm.save();
  
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  module.exports = router;