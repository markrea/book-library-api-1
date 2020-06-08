const express = require('express');

const router = express.Router();
const authorController = require('../controllers/author');

router
.route('/')
.post(authorController.createAuthor);

module.exports = router;
