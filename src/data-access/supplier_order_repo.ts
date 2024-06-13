import { SupplierOrder, ISupplierOrder } from "../models/supplier_order_model";
import { Supplier } from "../models/supplier_model"; // Import the Supplier model
import { SupplierOrderRequest } from "../models/supplier_order_request_model";
import { Vehicle } from "../models/vehicle_model";
import { Employee } from "../models/employee_model";

export const createSupplierOrderRepo = async (
    supplierOrderData: Partial<ISupplierOrder>
): Promise<ISupplierOrder> => {
    try {
        const supplierOrder = new SupplierOrder(supplierOrderData);
        return await supplierOrder.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getSupplierOrderByIdRepo = async (
    id: string
): Promise<ISupplierOrder | null> => {
    try {
        return await SupplierOrder.findById(id)
            .populate("supplierOrderRequest")
            .populate("tripDetails.vehicle")
            .populate("tripDetails.driver");
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateSupplierOrderRepo = async (
    id: string,
    updateData: Partial<ISupplierOrder>
): Promise<ISupplierOrder | null> => {
    try {
        return await SupplierOrder.findByIdAndUpdate(id, updateData, {
            new: true,
        })
            .populate("supplierOrderRequest")
            .populate("tripDetails.vehicle")
            .populate("tripDetails.driver");
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteSupplierOrderRepo = async (
    id: string
): Promise<ISupplierOrder | null> => {
    try {
        const supplierOrder = await getSupplierOrderByIdRepo(id);
        await SupplierOrder.findByIdAndDelete(id);
        return supplierOrder;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllSupplierOrdersRepo = async (): Promise<ISupplierOrder[]> => {
    try {
        return await SupplierOrder.find()
            .populate({
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
            })
            .populate({
                path: "tripDetails.vehicle",
                model: "Vehicle",
            })
            .populate({
                path: "tripDetails.driver",
                model: "Employee",
            })
            .exec();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const searchSupplierOrdersByOrderIdRepo = async (
    orderId: string
): Promise<ISupplierOrder[]> => {
    try {
        return await SupplierOrder.find({ supplierOrderRequest: orderId })
            .populate({
                path: "supplierOrderRequest",
                model: "SupplierOrderRequest",
            })
            .populate({
                path: "tripDetails.vehicle",
                model: "Vehicle",
            })
            .populate({
                path: "tripDetails.driver",
                model: "Employee",
            });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const searchSupplierOrdersBySupplierNameRepo = async (
    supplierName: string
): Promise<ISupplierOrder[]> => {
    try {
        const suppliers = await Supplier.find({
            name: { $regex: supplierName, $options: "i" },
        });
        const supplierIds = suppliers.map((supplier) => supplier._id);

        return await SupplierOrder.find({
            supplierOrderRequest: { $in: supplierIds },
        })
            .populate("supplierOrderRequest")
            .populate("tripDetails.vehicle")
            .populate("tripDetails.driver");
    } catch (error) {
        throw new Error(error.message);
    }
};
