import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import EntryForm from '../components/EntryForm';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchEntries = () => {
    if (!user) return;
    API.get('/entries', {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setEntries(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch entries:", err);
        setEntries([]); // prevent crashing
      });
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const handleDelete = async (id) => {
    await API.delete(`/entries/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchEntries();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <EntryForm onEntryAdded={fetchEntries} />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Health Entries</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        entries.map((entry, i) => (
          <div key={i} className="bg-white shadow-sm border p-4 rounded mb-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-blue-700">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <p><strong>Water:</strong> {entry.waterIntakeLiters} L</p>
            <p><strong>Sleep:</strong> {entry.sleepHours} hrs</p>
            <p><strong>Mood:</strong> {entry.mood}</p>
            <p><strong>Workout:</strong> {entry.workout?.type || 'N/A'} ({entry.workout?.duration || 0} mins)</p>
            <p><strong>Calories:</strong> {entry.workout?.caloriesBurned || 0}</p>
            <p><strong>Meal:</strong> 
              {entry.meals && entry.meals.length > 0 ? (
                <>
                  {entry.meals[0].type} - {entry.meals[0].calories} cal
                </>
              ) : (
                'No meal data'
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

