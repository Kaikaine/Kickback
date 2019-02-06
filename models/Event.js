const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 40
    },
    description: {
        type: String,
        required: true,
        max: 240
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})