import { IVehicle, Vehicle } from "../models/vehicle_model";

// Create a new vehicle
export const createVehicle = async (vehicle: IVehicle): Promise<IVehicle> => {
    try {
        console.log("VEHICLE SAVE");
        console.log(vehicle);
        const newVehicle = new Vehicle(vehicle);
        await newVehicle.save();
        return newVehicle;
    } catch (error) {
        throw new Error(`Failed to create vehicle: ${error}`);
    }
};

// Find all vehicle
export const findAllVehicle = async (): Promise<IVehicle[]> => {
    try {
        const vehicles = await Vehicle.find().exec();
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to find any vehicle: ${error}`);
    }
};

// Find all vehicle
export const findAllActiveVehicleLorryRepo = async (): Promise<IVehicle[]> => {
    try {
        const vehicles = await Vehicle.find({
            status: "ACTIVE",
            type: "Lorry",
        }).exec();
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to find any vehicle: ${error}`);
    }
};

// Find a vehicle by its number
export const findVehicleByNumber = async (
    number: string
): Promise<IVehicle | null> => {
    try {
        const vehicle = await Vehicle.findOne({ number });
        // console.log(number);
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to find vehicle by number: ${error}`);
    }
};

// Update a vehicle by its number
export const updateVehicleByNumber = async (
    number: string,
    updatedVehicle: Partial<IVehicle>
): Promise<IVehicle | null> => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            { number },
            updatedVehicle,
            { new: true }
        );
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to update vehicle by number: ${error}`);
    }
};

// Delete a vehicle by its number
export const deleteVehicleByNumber = async (number: string): Promise<void> => {
    try {
        await Vehicle.deleteOne({ number });
    } catch (error) {
        throw new Error(`Failed to delete vehicle by number: ${error}`);
    }
};

export const deleteVehicleByIdRepo = async (id: string): Promise<void> => {
    try {
        await Vehicle.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Failed to delete vehicle by ID: ${error}`);
    }
};

// Search vehicles by their numbers
export const searchVehiclesByNumber = async (
    number: string
): Promise<IVehicle[]> => {
    try {
        const vehicles = await Vehicle.find({ number });
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by number: ${error}`);
    }
};

// Search vehicles by their brand
export const searchVehiclesByBrand = async (
    brand: string
): Promise<IVehicle[]> => {
    try {
        const vehicles = await Vehicle.find({ brand });
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by brand: ${error}`);
    }
};

// Search vehicles by their type
export const searchVehiclesByType = async (
    type: string
): Promise<IVehicle[]> => {
    try {
        const vehicles = await Vehicle.find({ type });
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by type: ${error}`);
    }
};

// Search vehicles by their capacity
export const searchVehiclesByCapacity = async (
    capacity: number
): Promise<IVehicle[]> => {
    try {
        const vehicles = await Vehicle.find({ capacity });
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by capacity: ${error}`);
    }
};

export const getVehicleById = async (
    vehicleId: string
): Promise<IVehicle | null> => {
    try {
        const vehicle = await Vehicle.findOne({ vehicleId });
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to get vehicle by id: ${error}`);
    }
};

export const getLastVehicleId = async (): Promise<string | null> => {
    try {
        const lastVehicle = await Vehicle.findOne().sort({ vehicleId: -1 });
        return lastVehicle ? lastVehicle.vehicleId : null;
    } catch (error) {
        throw new Error(`Failed to get last vehicle id: ${error}`);
    }
};

export const updateVehicleByIdRepo = async (
    vehicleId: string,
    payload: Partial<IVehicle>
): Promise<IVehicle | null> => {
    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            { _id: vehicleId },
            payload,
            { new: true }
        );
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to update vehicle by id: ${error}`);
    }
};
