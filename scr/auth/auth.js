const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const {userValidate} = require('../models/user');
const {User} = require('../models/user');


// REGISTER
router.post('/register', async (req, res) => {
    try {
        const {error} = userValidate(req.body);
        if (error) 
            return res.status(400).send(error.details[0].message);
        

        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) 
            return res.status(400).send('Email already exists');

        const user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            gender: req.body.gender,
            role: req.body.role,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            school_system: req.body.school_system,
            location: req.body.location,
            age: req.body.age,
            profileImage: req.body.profileImage,
            phone_number: req.body.phone_number
        });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Wrong Email");
      }
  
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const inputPassword = req.body.password;
  
      if (originalPassword !== inputPassword) {
        return res.status(401).json("Wrong Password");
      }
  
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SEC,
        { expiresIn: '7d' }
      );
  
      const {
        password,
        ...others
      } = user._doc;
  
      // Verify the access token and check the isAdmin flag
      try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SEC);
        const isAdmin = decodedToken.isAdmin;
        console.log('isAdmin:', isAdmin);
      } catch (error) {
        console.error(error);
      }
  
      res.status(200).json({
        ...others,
        accessToken
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
