const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    instock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Food', foodSchema);
