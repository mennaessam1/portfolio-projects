const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensures category names are unique
  }
}, { timestamps: true });

const ActivityCategory = mongoose.model('ActivityCategory', activityCategorySchema);
module.exports = ActivityCategory;
