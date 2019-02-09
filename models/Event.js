const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    Yes: [],
    Maybe: [],
    date: {
        type: Date,
        required: true
    }
})

module.exports = Event = mongoose.model('Event', EventSchema)