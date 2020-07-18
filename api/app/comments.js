const express = require('express');
const auth = require('../middleware/auth');
const Comments = require('../models/Comments');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const comments = await Comments.find({ place: req.params.id }).populate('user', '_id, displayName').populate('place', '_id, title').sort({ datetime: -1 });
  res.send(comments);
});

router.post('/', auth, async (req, res) => {
  const commentData = { ...req.body, user: req.user._id, datetime: new Date().toISOString() };

  const comments = new Comments(commentData);

  await comments.save();
  return res.send(comments);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  const comments = await Comments.deleteOne({ _id: req.params.id });
  res.send(comments);
});

module.exports = router;
