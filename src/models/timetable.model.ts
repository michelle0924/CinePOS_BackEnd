import { Schema } from 'mongoose';
import mongoose = require('mongoose');


const timetableSchema = new mongoose.Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  theaterId: { type: Schema.Types.ObjectId, ref: 'Theater' },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Timetable = mongoose.model('Timetable', timetableSchema);

export default Timetable;