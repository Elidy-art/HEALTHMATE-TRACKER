import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

const EntryForm = ({ onEntryAdded }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    waterIntakeLiters: '',
    sleepHours: '',
    mood: '',
    workout: {
      type: '',
      duration: '',
      caloriesBurned: '',
    },
    meals: [{ type: '', calories: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('workout.')) {
      const key = name.split('.')[1];
      setForm({ ...form, workout: { ...form.workout, [key]: value } });
    } else if (name.startsWith('meals.')) {
      const key = name.split('.')[1];
      setForm({
        ...form,
        meals: [{ ...form.meals[0], [key]: value }],
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/entries', form, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    onEntryAdded(); // Refresh the dashboard
    setForm({
      waterIntakeLiters: '',
      sleepHours: '',
      mood: '',
      workout: { type: '', duration: '', caloriesBurned: '' },
      meals: [{ type: '', calories: '' }],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mb-6"
    >
      <h3 className="text-xl font-bold mb-4 text-blue-700">Add Health Entry</h3>
      <div className="grid gap-4">
        <input
          className="input"
          name="waterIntakeLiters"
          placeholder="Water Intake (L)"
          value={form.waterIntakeLiters}
          onChange={handleChange}
        />
        <input
          className="input"
          name="sleepHours"
          placeholder="Sleep Hours"
          value={form.sleepHours}
          onChange={handleChange}
        />
        <input
          className="input"
          name="mood"
          placeholder="Mood (happy, sad, tired...)"
          value={form.mood}
          onChange={handleChange}
        />
        <input
          className="input"
          name="workout.type"
          placeholder="Workout Type (e.g., Running)"
          value={form.workout.type}
          onChange={handleChange}
        />
        <input
          className="input"
          name="workout.duration"
          placeholder="Workout Duration (mins)"
          value={form.workout.duration}
          onChange={handleChange}
        />
        <input
          className="input"
          name="workout.caloriesBurned"
          placeholder="Calories Burned"
          value={form.workout.caloriesBurned}
          onChange={handleChange}
        />
        <input
          className="input"
          name="meals.0.type"
          placeholder="Meal (e.g., Lunch)"
          value={form.meals[0].type}
          onChange={handleChange}
        />
        <input
          className="input"
          name="meals.0.calories"
          placeholder="Meal Calories"
          value={form.meals[0].calories}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
};

export default EntryForm;
