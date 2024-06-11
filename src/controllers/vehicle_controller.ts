import { Request, Response } from "express";
import {
    createVehicleService,
    findVehicleByNumberService,
    updateVehicleByNumberService,
    deleteVehicleByNumberService,
    searchVehiclesByNumberService,
    searchVehiclesByBrandService,
    searchVehiclesByTypeService,
    searchVehiclesByCapacityService,
    findAllVehiclesService,
    deleteVehicleByIdService,
    updateVehicleService,
    getAllActiveVehicleLorriesService,
} from "../services/vehicle_service";
import { IVehicle } from "../models/vehicle_model";

export const createVehicleController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const vehicle = await createVehicleService(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findVehicleByNumberController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { number } = req.params;
        const vehicle = await findVehicleByNumberService(number);
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVehicleByNumberController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { number } = req.params;
        const updatedVehicle = req.body;
        const vehicle = await updateVehicleByNumberService(
            number,
            updatedVehicle
        );
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVehicleByNumberController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { number } = req.params;
        await deleteVehicleByNumberService(number);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchVehiclesByNumberController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { number } = req.params;
        const vehicles = await searchVehiclesByNumberService(number);
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchVehiclesByBrandController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { brand } = req.params;
        const vehicles = await searchVehiclesByBrandService(brand);
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchVehiclesByTypeController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { type } = req.params;
        const vehicles = await searchVehiclesByTypeService(type);
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchVehiclesByCapacityController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { capacity } = req.params;
        const vehicles = await searchVehiclesByCapacityService(
            parseInt(capacity)
        );
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findAllVehiclesController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const vehicles = await findAllVehiclesService();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVehicleByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteVehicleByIdService(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVehicleController = async (req: Request, res: Response) => {
    const vehicleId = req.params.id;
    const payload: Partial<IVehicle> = req.body;

    try {
        console.log(vehicleId, payload);
        const updatedVehicle = await updateVehicleService(vehicleId, payload);
        if (updatedVehicle) {
            return res.status(200).json(updatedVehicle);
        } else {
            return res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Failed to update vehicle: ${error.message}` });
    }
};

export const getAllActiveVehicleLorriesController = async (
    req: Request,
    res: Response
) => {
    try {
        const vehicles = await getAllActiveVehicleLorriesService();
        res.status(200).json({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        console.error(
            "Controller error retrieving active vehicle lorries:",
            error
        );
        res.status(500).json({
            success: false,
            message: "Could not retrieve active vehicle lorries",
        });
    }
};

// Add other necessary functions based on your application's needs
