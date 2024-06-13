import { Request, Response } from "express";
import {
    createSupplierOrderRequestService,
    getSupplierOrderRequestByIdService,
    getAllSupplierOrderRequestsService,
    searchSupplierOrderRequestsByOrderIdService,
    searchSupplierOrderRequestsBySupplierService,
    updateSupplierOrderRequestStatusService,
    deleteSupplierOrderRequestService,
    updateSupplierOrderRequestService,
    getAllConfirmedSupplierOrderRequestsService,
} from "../services/supplier_order_request_service";
import { ISupplierOrderRequest } from "../models/supplier_order_request_model";

export const createSupplierOrderRequestController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const data: ISupplierOrderRequest = req.body;
        const newSupplierOrderRequest = await createSupplierOrderRequestService(
            data
        );
        res.status(201).json(newSupplierOrderRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSupplierOrderRequestByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const supplierOrderRequest = await getSupplierOrderRequestByIdService(
            id
        );
        if (supplierOrderRequest) {
            res.status(200).json(supplierOrderRequest);
        } else {
            res.status(404).json({
                message: "Supplier order request not found",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSupplierOrderRequestsController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const allSupplierOrderRequests =
            await getAllSupplierOrderRequestsService();
        res.status(200).json(allSupplierOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchSupplierOrderRequestsByOrderIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { orderId } = req.params;
        const supplierOrderRequests =
            await searchSupplierOrderRequestsByOrderIdService(orderId);
        res.status(200).json(supplierOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchSupplierOrderRequestsBySupplierController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { supplierId } = req.params;
        const supplierOrderRequests =
            await searchSupplierOrderRequestsBySupplierService(supplierId);
        res.status(200).json(supplierOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplierOrderRequestStatusController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const status = req.body;
        console.log("SUPPLIER ORDER REQUEST STATUS UPDATE");
        console.log(status);
        const updatedSupplierOrderRequest =
            await updateSupplierOrderRequestStatusService(id, status);
        if (updatedSupplierOrderRequest) {
            res.status(200).json(updatedSupplierOrderRequest);
        } else {
            res.status(404).json({
                message: "Supplier order request not found",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSupplierOrderRequestController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteSupplierOrderRequestService(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplierOrderRequestController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedSupplierOrderRequest =
            await updateSupplierOrderRequestService(id, updateData);

        if (!updatedSupplierOrderRequest) {
            res.status(404).json({
                message: "Supplier order request not found",
            });
            return;
        }

        res.status(200).json(updatedSupplierOrderRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllConfirmedSupplierOrderRequestsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const supplierOrderRequests = await getAllConfirmedSupplierOrderRequestsService();
        res.status(200).json(supplierOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
