import {
    createWarehouseService,
    findWarehouseByIdService,
    findAllWarehousesService,
    updateWarehouseService,
    deleteWarehouseService,
    findWarehousesByCityService,
    updateWarehouseStockService,
    getLastIndexWarehouseService
} from "../services/warehouse_service";
import { Request, Response } from "express";

export const createWarehouseController = async (req: Request, res: Response): Promise<void> => {
    try {
        const warehouse = await createWarehouseService(req.body);
        res.status(201).json(warehouse);
    } catch (error) {
        res.status(500).json({ error: `Failed to create warehouse: ${error.message}` });
    }
};

export const findWarehouseByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await findWarehouseByIdService(id);
        if (!warehouse) {
            res.status(404).json({ message: "Warehouse not found" });
            return;
        }
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ error: `Failed to find warehouse by ID: ${error.message}` });
    }
};

export const findAllWarehousesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const warehouses = await findAllWarehousesService();
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ error: `Failed to find all warehouses: ${error.message}` });
    }
};

export const updateWarehouseController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await updateWarehouseService(id, req.body);
        if (!warehouse) {
            res.status(404).json({ message: "Warehouse not found" });
            return;
        }
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ error: `Failed to update warehouse: ${error.message}` });
    }
};

export const deleteWarehouseController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const warehouse = await deleteWarehouseService(id);
        if (!warehouse) {
            res.status(404).json({ message: "Warehouse not found" });
            return;
        }
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ error: `Failed to delete warehouse: ${error.message}` });
    }
};

export const findWarehousesByCityController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { city } = req.params;
        const warehouses = await findWarehousesByCityService(city);
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ error: `Failed to find warehouses by city: ${error.message}` });
    }
};

export const updateWarehouseStockController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const stockUpdates = req.body;
        const warehouse = await updateWarehouseStockService(id, stockUpdates);
        if (!warehouse) {
            res.status(404).json({ message: "Warehouse not found" });
            return;
        }
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ error: `Failed to update warehouse stock: ${error.message}` });
    }
};

export const getLastIndexWarehouseController = async (req: Request, res: Response): Promise<void> => {
    try {
        const warehouse = await getLastIndexWarehouseService();
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ error: `Failed to get last index warehouse: ${error.message}` });
    }
};
