import {
    SupplierPayment,
    IsupplierPayment,
} from "../models/supplier_payment_model";
import { SupplierOrder } from "../models/supplier_order_model";

// Create a new supplier payment
export const createSupplierPaymentService = async (paymentData: IsupplierPayment) => {
    try {
        const newPayment = new SupplierPayment(paymentData);
        return await newPayment.save();
    } catch (error) {
        throw new Error(`Error creating supplier payment: ${error.message}`);
    }
};

// Get a supplier payment by ID
export const getSupplierPaymentByIdService = async (id: string) => {
    try {
        return await SupplierPayment.findById(id)
            .populate("supplierOrder")
            .exec();
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
        return await SupplierPayment.findByIdAndUpdate(id, updateData, {
            new: true,
        })
            .populate("supplierOrder")
            .exec();
    } catch (error) {
        throw new Error(
            `Error updating supplier payment by ID: ${error.message}`
        );
    }
};

// Delete a supplier payment by ID
export const deleteSupplierPaymentByIdService = async (id: string) => {
    try {
        return await SupplierPayment.findByIdAndDelete(id).exec();
    } catch (error) {
        throw new Error(
            `Error deleting supplier payment by ID: ${error.message}`
        );
    }
};

// Get all supplier payments
export const getAllSupplierPaymentsService = async () => {
    try {
        return await SupplierPayment.find().populate("supplierOrder").exec();
    } catch (error) {
        throw new Error(
            `Error getting all supplier payments: ${error.message}`
        );
    }
};

// Search supplier payments by supplier order ID
export const searchSupplierPaymentsByOrderIdService = async (orderId: string) => {
    try {
        return await SupplierPayment.find({ supplierOrder: orderId })
            .populate("supplierOrder")
            .exec();
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
        const supplierOrders = await SupplierOrder.find({
            supplierName: new RegExp(supplierName, "i"),
        })
            .select("_id")
            .exec();
        const orderIds = supplierOrders.map((order) => order._id);
        return await SupplierPayment.find({ supplierOrder: { $in: orderIds } })
            .populate("supplierOrder")
            .exec();
    } catch (error) {
        throw new Error(
            `Error searching supplier payments by supplier name: ${error.message}`
        );
    }
};
