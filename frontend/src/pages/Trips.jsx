// Trips page - displays trip form and trip list for the logged-in user
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TripForm from '../components/TripForm';
import TripList from '../components/TripList';
import { useAuth } from '../context/AuthContext';

const Trips = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axiosInstance.get('/api/trips', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTrips(response.data);
      } catch (error) {
        alert('Failed to fetch trips.');
      }
    };

    if (user) fetchTrips();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TripForm
        trips={trips}
        setTrips={setTrips}
        editingTrip={editingTrip}
        setEditingTrip={setEditingTrip}
      />
      <TripList trips={trips} setTrips={setTrips} setEditingTrip={setEditingTrip} />
    </div>
  );
};

export default Trips;
