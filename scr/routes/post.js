const express = require('express');
const router = express.Router();
const {getPost, insertPost, deletePost} = require('../logic/post');

router.get('/', getPost);
router.post('/', insertPost);
router.delete('/:id', deletePost);


module.exports = router;