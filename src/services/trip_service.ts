import { ITrip } from "../models/trip_model";
import * as TripRepository from "../data-access/trip_repo";
import { getAllCompletedTripsRepo } from "../data-access/trip_repo";

export const createTrip = async (trip: any): Promise<ITrip> => {
    try {
        console.log("CREATED TRIP");
        console.log(trip);
        return await TripRepository.createTrip(trip);
    } catch (error) {
        throw new Error("Could not create trip");
    }
};

export const getTripById = async (id: string): Promise<ITrip | null> => {
    try {
        return await TripRepository.getTripById(id);
    } catch (error) {
        throw new Error("Could not get trip by id");
    }
};

export const updateTrip = async (
    id: string,
    trip: any
): Promise<ITrip | null> => {
    try {
        return await TripRepository.updateTrip(id, trip);
    } catch (error) {
        throw new Error("Could not update trip");
    }
};

export const deleteTrip = async (id: string): Promise<void> => {
    try {
        await TripRepository.deleteTrip(id);
    } catch (error) {
        throw new Error("Could not delete trip");
    }
};

export const searchTripByTripId = async (
    tripId: string
): Promise<ITrip | null> => {
    try {
        return await TripRepository.searchTripByTripId(tripId);
    } catch (error) {
        throw new Error("Could not search for trip by tripId");
    }
};

export const getAllTrips = async (filters?): Promise<ITrip[]> => {
    try {
        return await TripRepository.getAllTrips(filters);
    } catch (error) {
        throw new Error("Could not get all trips");
    }
};

export const getAllCompletedTripsService = async (): Promise<ITrip[]> => {
    try {
        return await getAllCompletedTripsRepo();
    } catch (error) {
        throw new Error("Could not get all trips");
    }
};
