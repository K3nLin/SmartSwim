const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  workoutDate: {type: Date, default: Date.now},
  durationSeconds: {type: Number},
  distance: {type: Number},
  strokeCount: {type: Number},
  seaState: {type: String},
  temperature: {type: Number},

  rawData: [
    {
      Uptime: {type: Number},
      Temperature: {type: Number},
      acceleration: {type: [Number]},
      position: {type: [Number]},
    },
  ],
});

module.exports = mongoose.model('Workout', WorkoutSchema);
