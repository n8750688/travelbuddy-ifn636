// TripList component - displays user trips with edit and delete options
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TripList = ({ trips, setTrips, setEditingTrip }) => {
  const { user } = useAuth();

  const handleDelete = async (tripId) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    try {
      await axiosInstance.delete(`/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      alert('Failed to delete trip.');
    }
  };

  if (trips.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>No trips planned yet. Add your first trip above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Trips ({trips.length})</h2>
      {trips.map((trip) => (
        <div key={trip._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{trip.destination}</h3>
            {trip.budget > 0 && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                ${trip.budget}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
          </p>
          {trip.notes && <p className="mt-2 text-gray-700">{trip.notes}</p>}
          <div className="mt-3">
            <button
              onClick={() => setEditingTrip(trip)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(trip._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;
