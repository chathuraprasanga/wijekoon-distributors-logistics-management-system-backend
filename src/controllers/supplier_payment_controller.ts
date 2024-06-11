import { Request, Response } from "express";
import {
    createSupplierPaymentService,
    getSupplierPaymentByIdService,
    updateSupplierPaymentByIdService,
    deleteSupplierPaymentByIdService,
    getAllSupplierPaymentsService,
    searchSupplierPaymentsByOrderIdService,
    searchSupplierPaymentsBySupplierNameService,
} from "../services/supplier_payment_service";

// Create a new supplier payment
export const createSupplierPaymentController = async (
    req: Request,
    res: Response
) => {
    try {
        const newPayment = await createSupplierPaymentService(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a supplier payment by ID
export const getSupplierPaymentByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const payment = await getSupplierPaymentByIdService(req.params.id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ message: "Supplier payment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a supplier payment by ID
export const updateSupplierPaymentByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const updatedPayment = await updateSupplierPaymentByIdService(
            req.params.id,
            req.body
        );
        if (updatedPayment) {
            res.status(200).json(updatedPayment);
        } else {
            res.status(404).json({ message: "Supplier payment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a supplier payment by ID
export const deleteSupplierPaymentByIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const deletedPayment = await deleteSupplierPaymentByIdService(
            req.params.id
        );
        if (deletedPayment) {
            res.status(200).json({ message: "Supplier payment deleted" });
        } else {
            res.status(404).json({ message: "Supplier payment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all supplier payments
export const getAllSupplierPaymentsController = async (
    req: Request,
    res: Response
) => {
    try {
        const payments = await getAllSupplierPaymentsService();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search supplier payments by supplier order ID
export const searchSupplierPaymentsByOrderIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const payments = await searchSupplierPaymentsByOrderIdService(
            req.params.orderId
        );
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search supplier payments by supplier name
export const searchSupplierPaymentsBySupplierNameController = async (
    req: Request,
    res: Response
) => {
    try {
        const payments = await searchSupplierPaymentsBySupplierNameService(
            req.params.supplierName
        );
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
