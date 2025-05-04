const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransportSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    city:
    {
        type: String,
        required: true
    },
    touristID: {
        type: Schema.Types.ObjectId,
        ref: 'Tourist',
        required: false
    }
});

module.exports = mongoose.model('Transport', TransportSchema);