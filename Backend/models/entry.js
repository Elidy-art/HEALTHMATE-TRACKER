const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  waterIntakeLiters: Number,
  sleepHours: Number,
  mood: String,
  workout: {
    type: { type: String },
    duration: Number,
    caloriesBurned: Number,
  },
  meals: [
    {
      type: String,
      calories: Number
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);
