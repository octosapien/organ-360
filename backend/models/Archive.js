const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }],  // Array of image URLs
});

module.exports = mongoose.model('Archive', ArchiveSchema);
