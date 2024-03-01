// models/itemModel.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    pictures: {
        type: [String], // Array of picture URLs
        required: true,
    },
    names: {
        type: [{
            language: { type: String, required: true },
            value: { type: String, required: true },
        }],
        required: true,
    },
    descriptions: {
        type: [{
            language: { type: String, required: true },
            value: { type: String, required: true },
        }],
        required: true,
    },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
