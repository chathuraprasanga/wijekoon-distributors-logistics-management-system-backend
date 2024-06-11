import {
    createSupplierService,
    getSupplierByIdService,
    updateSupplierService,
    deleteSupplierService,
    searchSupplierService,
    getAllSuppliersService,
} from "../services/supplier_service"; // Adjust the import path as needed
import { Request, Response } from "express";

export const createSupplierController = async (req: Request, res: Response): Promise<void> => {
    try {
        const supplierData = req.body;
        const newSupplier = await createSupplierService(supplierData);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSupplierByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const supplier = await getSupplierByIdService(id);
        if (supplier) {
            res.status(200).json(supplier);
        } else {
            res.status(404).json({ message: "Supplier not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplierController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedSupplier = await updateSupplierService(id, updates);
        if (updatedSupplier) {
            res.status(200).json(updatedSupplier);
        } else {
            res.status(404).json({ message: "Supplier not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSupplierController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteSupplierService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchSupplierController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.query;
        const suppliers = await searchSupplierService(query as string);
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSuppliersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const suppliers = await getAllSuppliersService();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
