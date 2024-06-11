import { IVehicle } from "../models/vehicle_model";
import {
    createVehicle,
    findVehicleByNumber,
    updateVehicleByNumber,
    deleteVehicleByNumber,
    searchVehiclesByNumber,
    searchVehiclesByBrand,
    searchVehiclesByType,
    searchVehiclesByCapacity,
    findAllVehicle,
    deleteVehicleByIdRepo,
    getLastVehicleId,
    updateVehicleByIdRepo,
    findAllActiveVehicleLorryRepo,
} from "../data-access/vehicle_repo";

// Create a new vehicle
export const createVehicleService = async (vehicle: any): Promise<IVehicle> => {
    try {
        const lastVehicleId = await getLastVehicleId();
        console.log("Last Vehicle ID:", lastVehicleId);

        const vehicleId = await generateVehicleId(lastVehicleId);
        console.log("Generated Vehicle ID:", vehicleId);

        const payload = { ...vehicle, vehicleId };
        console.log("Payload:", payload);

        const newVehicle = await createVehicle(payload);
        return newVehicle;
    } catch (error) {
        throw new Error(`Failed to create vehicle: ${error}`);
    }
};

const generateVehicleId = async (lastVehicleId) => {
    const lastId = lastVehicleId ? parseInt(lastVehicleId.split("-")[1]) : 0;
    const newId = (lastId + 1).toString().padStart(3, "0");
    return `WDV-${newId}`;
};

// Find all vehicles
export const findAllVehiclesService = async (): Promise<IVehicle[]> => {
    try {
        const vehicles = await findAllVehicle();
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to find any vehicles: ${error}`);
    }
};

// Find a vehicle by its number
export const findVehicleByNumberService = async (
    number: string
): Promise<IVehicle | null> => {
    try {
        const vehicle = await findVehicleByNumber(number);
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to find vehicle by number: ${error}`);
    }
};

// Update a vehicle by its number
export const updateVehicleByNumberService = async (
    number: string,
    updatedVehicle: Partial<IVehicle>
): Promise<IVehicle | null> => {
    try {
        const vehicle = await updateVehicleByNumber(number, updatedVehicle);
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to update vehicle by number: ${error}`);
    }
};

// Delete a vehicle by its number
export const deleteVehicleByNumberService = async (
    number: string
): Promise<void> => {
    try {
        await deleteVehicleByNumber(number);
    } catch (error) {
        throw new Error(`Failed to delete vehicle by number: ${error}`);
    }
};

// Search vehicles by their numbers
export const searchVehiclesByNumberService = async (
    number: string
): Promise<IVehicle[]> => {
    try {
        const vehicles = await searchVehiclesByNumber(number);
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by number: ${error}`);
    }
};

// Search vehicles by their brand
export const searchVehiclesByBrandService = async (
    brand: string
): Promise<IVehicle[]> => {
    try {
        const vehicles = await searchVehiclesByBrand(brand);
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by brand: ${error}`);
    }
};

// Search vehicles by their type
export const searchVehiclesByTypeService = async (
    type: string
): Promise<IVehicle[]> => {
    try {
        const vehicles = await searchVehiclesByType(type);
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by type: ${error}`);
    }
};

// Search vehicles by their capacity
export const searchVehiclesByCapacityService = async (
    capacity: number
): Promise<IVehicle[]> => {
    try {
        const vehicles = await searchVehiclesByCapacity(capacity);
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to search vehicles by capacity: ${error}`);
    }
};

export const deleteVehicleByIdService = async (id: string): Promise<void> => {
    try {
        await deleteVehicleByIdRepo(id);
    } catch (error) {
        throw new Error(`Failed to delete vehicle by ID: ${error}`);
    }
};

export const updateVehicleService = async (
    vehicleId: string,
    payload: Partial<IVehicle>
): Promise<IVehicle | null> => {
    try {
        const updatedVehicle = await updateVehicleByIdRepo(vehicleId, payload);
        return updatedVehicle;
    } catch (error) {
        throw new Error(`Failed to update vehicle: ${error}`);
    }
};

export const getAllActiveVehicleLorriesService = async () => {
    try {
        const vehicles = await findAllActiveVehicleLorryRepo();
        return vehicles;
    } catch (error) {
        console.error(
            "Service error retrieving active vehicle lorries:",
            error
        );
        throw new Error(
            "Service error: Could not retrieve active vehicle lorries"
        );
    }
};
