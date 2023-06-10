// const express = require('express');
// const router = express.Router();
// const { User, userValidate } = require('../models/user');

// router.post('/', async (req, res) => {
//   const { error } = userValidate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = new User({
//     id: req.body.id,
//     fname: req.body.fname,
//     lname: req.body.lname,
//     email: req.body.email,
//     gender: req.body.gender,
//     role: req.body.role,
//     password: req.body.password,
//     school_system: req.body.school_system,
//     location: req.body.location,
//     age: req.body.age,
//     profileImage: req.body.profileImage,
//     phone_number: req.body.phone_number,
//     jwtToken: req.body.jwtToken,
//   });

//   user = await user.save();
//   res.send(user);
// });

// module.exports = router;