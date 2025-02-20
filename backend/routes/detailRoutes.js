const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail');

// Add detail
router.post('/', async (req, res) => {
    try {
        const { archiveId, heading, content } = req.body;
        const detail = new Detail({ archiveId, heading, content });
        await detail.save();
        res.json(detail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete detail
router.delete('/:id', async (req, res) => {
    try {
        await Detail.findByIdAndDelete(req.params.id);
        res.json({ message: 'Detail deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
