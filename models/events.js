const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  attachment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
