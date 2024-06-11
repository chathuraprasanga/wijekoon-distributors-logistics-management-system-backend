import { Request, Response } from "express";
import {
    createSupplierOrderService,
    getSupplierOrderByIdService,
    updateSupplierOrderService,
    deleteSupplierOrderService,
    getAllSupplierOrdersService,
    searchSupplierOrdersByOrderIdService,
    searchSupplierOrdersBySupplierNameService,
} from "../services/supplier_order_service";

export const createSupplierOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const supplierOrderData = req.body;
        const newSupplierOrder = await createSupplierOrderService(
            supplierOrderData
        );
        res.status(201).json(newSupplierOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSupplierOrderByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id;
        const supplierOrder = await getSupplierOrderByIdService(id);
        if (supplierOrder) {
            res.status(200).json(supplierOrder);
        } else {
            res.status(404).json({ message: "Supplier order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSupplierOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedSupplierOrder = await updateSupplierOrderService(
            id,
            updateData
        );
        if (updatedSupplierOrder) {
            res.status(200).json(updatedSupplierOrder);
        } else {
            res.status(404).json({ message: "Supplier order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSupplierOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id;
        const deletedSupplierOrder = await deleteSupplierOrderService(id);
        if (deletedSupplierOrder) {
            res.status(200).json(deletedSupplierOrder);
        } else {
            res.status(404).json({ message: "Supplier order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllSupplierOrdersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const supplierOrders = await getAllSupplierOrdersService();
        res.status(200).json(supplierOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchSupplierOrdersByOrderIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orderId = req.params.orderId;
        const supplierOrders = await searchSupplierOrdersByOrderIdService(
            orderId
        );
        res.status(200).json(supplierOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchSupplierOrdersBySupplierNameController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const supplierName = req.params.supplierName;
        const supplierOrders = await searchSupplierOrdersBySupplierNameService(
            supplierName
        );
        res.status(200).json(supplierOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
