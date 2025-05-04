const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, default: "" },
    notifications: [
        {
            type: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
            read: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
