const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  gallery: [String],
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
