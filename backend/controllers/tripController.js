// Trip controller - handles Create, Read, Update, Delete operations for trips
const Trip = require('../models/Trip');

// CREATE a new trip
const createTrip = async (req, res) => {
    const { destination, startDate, endDate, notes, budget } = req.body;
    try {
        const trip = await Trip.create({
            user: req.user.id,
            destination,
            startDate,
            endDate,
            notes,
            budget
        });
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ all trips for the logged-in user
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ a single trip by ID
const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a trip
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { destination, startDate, endDate, notes, budget } = req.body;
        trip.destination = destination || trip.destination;
        trip.startDate = startDate || trip.startDate;
        trip.endDate = endDate || trip.endDate;
        trip.notes = notes !== undefined ? notes : trip.notes;
        trip.budget = budget !== undefined ? budget : trip.budget;

        const updatedTrip = await trip.save();
        res.json(updatedTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a trip
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Trip.findByIdAndDelete(req.params.id);
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTrip, getTrips, getTripById, updateTrip, deleteTrip };
