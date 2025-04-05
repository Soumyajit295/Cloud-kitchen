const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    locality: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    state: { type: String },
    landmark: { type: String }
});

module.exports = mongoose.model('Address', addressSchema);
