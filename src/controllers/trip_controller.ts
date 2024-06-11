import { Request, Response } from "express";
import * as TripService from "../services/trip_service";

export const createTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const trip = req.body;
        const newTrip = await TripService.createTrip(trip);
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTripById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const trip = await TripService.getTripById(id);
        if (!trip) {
            res.status(404).json({ message: "Trip not found" });
            return;
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const trip = req.body;
        const updatedTrip = await TripService.updateTrip(id, trip);
        if (!updatedTrip) {
            res.status(404).json({ message: "Trip not found" });
            return;
        }
        res.json(updatedTrip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await TripService.deleteTrip(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchTripByTripId = async (req: Request, res: Response): Promise<void> => {
    try {
        const tripId = req.query.tripId as string;
        const trip = await TripService.searchTripByTripId(tripId);
        if (!trip) {
            res.status(404).json({ message: "Trip not found" });
            return;
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllTrips = async (req: Request, res: Response): Promise<void> => {
    try {
        const trips = await TripService.getAllTrips();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

