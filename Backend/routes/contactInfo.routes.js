const express = require('express');
const router = express.Router();
const { getContactInfo, updateContactInfo } = require('../controllers/contactInfo.controller');
const auth = require('../middleware/auth');

// Protected admin routes
router.get('/', auth, getContactInfo);
router.patch('/', auth, updateContactInfo);

module.exports = router;

