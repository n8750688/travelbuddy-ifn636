// Trip model - stores travel plans for each user
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    budget: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
