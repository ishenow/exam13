const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Place = require('../models/Place');
const Comments = require('../models/Comments');
const Gallery = require('../models/Gallery');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recipe = await Place.find().populate('user', '_id, displayName');

    res.send(recipe);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const placeId = req.params.id;
  try {
    const place = await Place.findById(placeId).populate('user', '_id, displayName');
    res.send(place);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send(e);
    }
    return res.status(500).send(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const placeData = { user: req.user._id, title: req.body.title, desc: req.body.desc, image: req.body.image };

  if (req.file) {
    placeData.image = req.file.filename;
  }

  const place = new Place(placeData);

  if (req.body.agree === 'false') {
    return res.send.status(400).send({ error: 'You did not accept the agreement!' });
  } else {
    await place.save();
    res.send(place);
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    await Place.deleteOne({ _id: req.params.id });
    await Comments.deleteMany({ place: req.params.id });
    await Gallery.deleteMany({ place: req.params.id });

    return res.send('Ok');
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }

});

module.exports = router;
