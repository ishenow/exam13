const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  quality: Number,
  service: Number,
  interior: Number,
  datetime: String,
});

const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
