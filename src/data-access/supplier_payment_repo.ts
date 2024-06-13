import {
    SupplierPayment,
    IsupplierPayment,
} from "../models/supplier_payment_model";
import { SupplierOrder } from "../models/supplier_order_model";

// Create a new supplier payment
export const createSupplierPayment = async (paymentData: IsupplierPayment) => {
    const newPayment = new SupplierPayment(paymentData);
    return await newPayment.save();
};

// Get a supplier payment by ID
export const getSupplierPaymentById = async (id: string) => {
    return await SupplierPayment.findById(id).populate("supplierOrder").exec();
};

// Update a supplier payment by ID
export const updateSupplierPaymentById = async (
    id: string,
    updateData: Partial<IsupplierPayment>
) => {
    return await SupplierPayment.findByIdAndUpdate(id, updateData, {
        new: true,
    })
        .populate("supplierOrder")
        .exec();
};

// Delete a supplier payment by ID
export const deleteSupplierPaymentById = async (id: string) => {
    return await SupplierPayment.findByIdAndDelete(id).exec();
};

// Get all supplier payments
export const getAllSupplierPayments = async () => {
    return await SupplierPayment.find()
    .populate({
        path: "supplierOrder",
        model: "SupplierOrder",
        populate: [
            {
                path: "supplierOrderRequest",
                model: "SupplierOrderRequest",
                populate: [
                    {
                        path: "supplier",
                        model: "Supplier",
                    },
                    {
                        path: "order.product",
                        model: "Product",
                    },
                ],
            },
        ],
        strictPopulate: false,
    })
    .exec();
};

// Search supplier payments by supplier order ID
export const searchSupplierPaymentsByOrderId = async (orderId: string) => {
    return await SupplierPayment.find({ supplierOrder: orderId })
        .populate("supplierOrder")
        .exec();
};

// Search supplier payments by supplier name
export const searchSupplierPaymentsBySupplierName = async (
    supplierName: string
) => {
    const supplierOrders = await SupplierOrder.find({
        supplierName: new RegExp(supplierName, "i"),
    })
        .select("_id")
        .exec();
    const orderIds = supplierOrders.map((order) => order._id);
    return await SupplierPayment.find({ supplierOrder: { $in: orderIds } })
        .populate("supplierOrder")
        .exec();
};
