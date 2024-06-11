import { Trip, ITrip } from "../models/trip_model";

export const createTrip = async (trip: ITrip): Promise<ITrip> => {
    try {
        const newTrip = new Trip(trip);
        await newTrip.save();
        return newTrip;
    } catch (error) {
        throw new Error("Could not create trip");
    }
};

export const getTripById = async (id: string): Promise<ITrip | null> => {
    try {
        return await Trip.findById(id);
    } catch (error) {
        throw new Error("Could not find trip");
    }
};

export const updateTrip = async (
    id: string,
    trip: ITrip
): Promise<ITrip | null> => {
    try {
        return await Trip.findByIdAndUpdate(id, trip, { new: true });
    } catch (error) {
        throw new Error("Could not update trip");
    }
};

export const deleteTrip = async (id: string): Promise<void> => {
    try {
        await Trip.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Could not delete trip");
    }
};

export const searchTripByTripId = async (
    tripId: string
): Promise<ITrip | null> => {
    try {
        return await Trip.findOne({ tripId });
    } catch (error) {
        throw new Error("Could not search for trip by tripId");
    }
};

export const getAllTrips = async (): Promise<ITrip[]> => {
    try {
        return await Trip.find();
    } catch (error) {
        throw new Error("Could not get all trips");
    }
};

export const getLastEnteredTripId = async (): Promise<string> => {
    try {
        const lastTrip = await Trip.findOne().sort({ tripId: -1 }).exec();
        if (lastTrip) {
            return lastTrip.tripId.toString();
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Could not retrieve last entered trip ID");
    }
};
