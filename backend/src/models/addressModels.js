const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    locality: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    state: { type: String,required : true },
    landmark: { type: String,required : true}
});

const Address = mongoose.model('Address',addressSchema)
module.exports = Address
