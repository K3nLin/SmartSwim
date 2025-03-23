const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const {durationSeconds, distance, strokeCount, seaState, rawData} =
      req.body;
    const userId = req.user.userId;

    const newWorkout = new Workout({
      userId,
      durationSeconds,
      distance,
      strokeCount,
      seaState,
      rawData,
    });

    await newWorkout.save();

    res.status(201).json({message: 'Workout saved successfully!'});
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({error: 'Server error'});
  }
};

exports.getWorkoutHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const workouts = await Workout.find({userId}).sort({createdAt: -1}); // latest first
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    res.status(500).json({error: 'Server error'});
  }
};
