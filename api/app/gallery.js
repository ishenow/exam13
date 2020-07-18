const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Gallery = require('../models/Gallery');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadGalleryPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/:id', async (req, res) => {
  const gallery = await Gallery.find({ place: req.params.id }).populate('user', '_id, displayName').populate('place', '_id');
  res.send(gallery);
});

router.post('/', auth, upload.array('gallery', 10), async (req, res) => {
  const galleryData = {
    gallery: [],
    user: req.user._id,
    place: req.body.place,
  };

  if (req.files) {
    galleryData.gallery = req.files.map(file => file.filename);
  }

  const gallery = new Gallery(galleryData);

  await gallery.save();
  return res.send(gallery);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  const gallery = await Gallery.deleteOne({ _id: req.params.id });
  res.send(gallery);
});


module.exports = router;
