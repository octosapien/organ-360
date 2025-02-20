const express = require('express'); 
const router = express.Router(); 
const Archive = require('../models/Archive'); 
const Detail = require('../models/Detail'); 
const multer = require('multer'); 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
const cloudinary = require('../cloudinaryConfig');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'archives', // Cloudinary folder
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage });

// ✅ Create archive with Cloudinary image uploads
router.post('/', upload.array('images'), async (req, res) => { 
    console.log("📌 POST /api/archives hit"); 
    try { 
        const { name } = req.body; 
        const imageUrls = req.files.map(file => file.path); // Cloudinary provides a direct URL

        const archive = new Archive({ name, images: imageUrls }); 
        await archive.save(); 
        res.json(archive); 
    } catch (err) { 
        console.error("❌ Error in POST:", err);
        res.status(500).json({ error: err.message }); 
    } 
});

// ✅ Get all archives
router.get('/', async (req, res) => { 
    console.log("📌 GET /api/archives hit"); 
    try { 
        const archives = await Archive.find(); 
        res.json(archives); 
    } catch (err) { 
        console.error("❌ Error in GET:", err);
        res.status(500).json({ error: err.message }); 
    } 
});

// ✅ Get single archive with details
router.get('/:id', async (req, res) => { 
    console.log("📌 GET /api/archives/:id hit"); 
    try { 
        const archive = await Archive.findById(req.params.id); 
        const details = await Detail.find({ archiveId: req.params.id }); 
        res.json({ archive, details }); 
    } catch (err) { 
        console.error("❌ Error in GET /:id", err);
        res.status(500).json({ error: err.message }); 
    } 
});

// ✅ Delete archive and related details
router.delete('/:id', async (req, res) => { 
    try { 
        await Archive.findByIdAndDelete(req.params.id); 
        await Detail.deleteMany({ archiveId: req.params.id }); 
        res.json({ message: 'Archive deleted' }); 
    } catch (err) { 
        console.error("❌ Error in DELETE /:id", err);
        res.status(500).json({ error: err.message }); 
    } 
});

module.exports = router;
