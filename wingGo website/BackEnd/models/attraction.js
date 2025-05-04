const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attractionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;