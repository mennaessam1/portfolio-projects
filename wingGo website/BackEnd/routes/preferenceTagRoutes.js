// routes/preferenceTagRoutes.js

const express = require('express');
const router = express.Router();
const preferenceTagController = require('../controllers/PreferenceTagController');

// Admin routes for managing preference tags
router.post('/preference-tags', preferenceTagController.createPreferenceTag);  // Create a new tag
router.get('/preference-tags', preferenceTagController.getAllPreferenceTags);  // Get all tags
router.put('/preference-tags/:id', preferenceTagController.updatePreferenceTag);  // Update a tag
router.delete('/preference-tags/:id', preferenceTagController.deletePreferenceTag);  // Delete a tag

module.exports = router;
