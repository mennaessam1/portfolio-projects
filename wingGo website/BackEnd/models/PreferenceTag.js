// models/PreferenceTag.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceTagSchema = new Schema({
    name: { type: String, required: true }, // Name of the preference tag

    description: { type: String }, // Optional description of the tag

    isActive: { type: Boolean, default: true } // Flag to indicate if the tag is active
    
}, { timestamps: true });

const PreferenceTag = mongoose.model('PreferenceTag', preferenceTagSchema);
module.exports = PreferenceTag;
