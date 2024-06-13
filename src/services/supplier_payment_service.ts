import {
    createSupplierPayment,
    getSupplierPaymentById,
    updateSupplierPaymentById,
    deleteSupplierPaymentById,
    getAllSupplierPayments,
    searchSupplierPaymentsByOrderId,
    searchSupplierPaymentsBySupplierName,
} from "../data-access/supplier_payment_repo";
import { IsupplierPayment } from "../models/supplier_payment_model";

// Create a new supplier payment
export const createSupplierPaymentService = async (
    paymentData: IsupplierPayment
) => {
    try {
        return await createSupplierPayment(paymentData);
    } catch (error) {
        throw new Error(`Error creating supplier payment: ${error.message}`);
    }
};

// Get a supplier payment by ID
export const getSupplierPaymentByIdService = async (id: string) => {
    try {
        return await getSupplierPaymentById(id);
    } catch (error) {
        throw new Error(
            `Error getting supplier payment by ID: ${error.message}`
        );
    }
};

// Update a supplier payment by ID
export const updateSupplierPaymentByIdService = async (
    id: string,
    updateData: Partial<IsupplierPayment>
) => {
    try {
        return await updateSupplierPaymentById(id, updateData);
    } catch (error) {
        throw new Error(
            `Error updating supplier payment by ID: ${error.message}`
        );
    }
};

// Delete a supplier payment by ID
export const deleteSupplierPaymentByIdService = async (id: string) => {
    try {
        return await deleteSupplierPaymentById(id);
    } catch (error) {
        throw new Error(
            `Error deleting supplier payment by ID: ${error.message}`
        );
    }
};

// Get all supplier payments
export const getAllSupplierPaymentsService = async () => {
    try {
        return await getAllSupplierPayments();
    } catch (error) {
        throw new Error(
            `Error getting all supplier payments: ${error.message}`
        );
    }
};

// Search supplier payments by supplier order ID
export const searchSupplierPaymentsByOrderIdService = async (
    orderId: string
) => {
    try {
        return await searchSupplierPaymentsByOrderId(orderId);
    } catch (error) {
        throw new Error(
            `Error searching supplier payments by order ID: ${error.message}`
        );
    }
};

// Search supplier payments by supplier name
export const searchSupplierPaymentsBySupplierNameService = async (
    supplierName: string
) => {
    try {
        return await searchSupplierPaymentsBySupplierName(supplierName);
    } catch (error) {
        throw new Error(
            `Error searching supplier payments by supplier name: ${error.message}`
        );
    }
};
