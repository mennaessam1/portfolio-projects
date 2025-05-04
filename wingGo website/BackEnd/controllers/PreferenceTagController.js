// controllers/PreferenceTagController.js

const PreferenceTag = require('../models/PreferenceTag');

// Create a new preference tag
const createPreferenceTag = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTag = new PreferenceTag({ name, description });
        await newTag.save();
        res.status(201).json({ message: 'Preference tag created successfully', newTag });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all active preference tags
const getAllPreferenceTags = async (req, res) => {
    try {
        const tags = await PreferenceTag.find({ isActive: true });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing preference tag
const updatePreferenceTag = async (req, res) => {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    try {
        const updatedTag = await PreferenceTag.findByIdAndUpdate(
            id,
            { name, description, isActive },
            { new: true }
        );
        if (!updatedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json({ message: 'Tag updated successfully', updatedTag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a preference tag
const deletePreferenceTag = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTag = await PreferenceTag.findByIdAndDelete(id);
        if (!deletedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPreferenceTag,
    getAllPreferenceTags,
    updatePreferenceTag,
    deletePreferenceTag
};
