const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    archiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Archive', required: true },
    heading: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Detail', DetailSchema);
