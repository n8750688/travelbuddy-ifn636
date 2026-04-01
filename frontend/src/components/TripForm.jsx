// TripForm component - handles creating and editing trips
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TripForm = ({ trips, setTrips, editingTrip, setEditingTrip }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    notes: '',
    budget: ''
  });

  useEffect(() => {
    if (editingTrip) {
      setFormData({
        destination: editingTrip.destination,
        startDate: editingTrip.startDate ? editingTrip.startDate.split('T')[0] : '',
        endDate: editingTrip.endDate ? editingTrip.endDate.split('T')[0] : '',
        notes: editingTrip.notes || '',
        budget: editingTrip.budget || ''
      });
    } else {
      setFormData({ destination: '', startDate: '', endDate: '', notes: '', budget: '' });
    }
  }, [editingTrip]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrip) {
        const response = await axiosInstance.put(`/api/trips/${editingTrip._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTrips(trips.map((trip) => (trip._id === response.data._id ? response.data : trip)));
      } else {
        const response = await axiosInstance.post('/api/trips', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTrips([response.data, ...trips]);
      }
      setEditingTrip(null);
      setFormData({ destination: '', startDate: '', endDate: '', notes: '', budget: '' });
    } catch (error) {
      alert('Failed to save trip.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
  {editingTrip ? '✏️ Edit Trip' : '🌍 Plan a New Trip'}
      </h1>
      <input
        type="text"
        placeholder="Destination"
        value={formData.destination}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
      <input
        type="number"
        placeholder="Budget ($)"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Notes (optional)"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        rows="3"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        {editingTrip ? 'Update Trip' : 'Add Trip'}
      </button>
      {editingTrip && (
        <button
          type="button"
          onClick={() => setEditingTrip(null)}
          className="w-full mt-2 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TripForm;
