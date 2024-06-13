import {
    SupplierOrderRequest,
    ISupplierOrderRequest,
} from "../models/supplier_order_request_model";

export const createSupplierOrderRequest = async (
    data: any
): Promise<ISupplierOrderRequest> => {
    try {
        const newSupplierOrderRequest = await SupplierOrderRequest.create(data);
        return newSupplierOrderRequest;
    } catch (error) {
        throw new Error(error);
    }
};

export const getSupplierOrderRequestById = async (
    id: string
): Promise<ISupplierOrderRequest | null> => {
    try {
        const supplierOrderRequest = await SupplierOrderRequest.findById(id)
            .populate({
                path: "supplier",
                model: "Supplier",
            })
            .populate({
                path: "order.product",
                model: "Product",
            });
        return supplierOrderRequest;
    } catch (error) {
        throw new Error(error.message); // Include .message to get the actual error message
    }
};

export const getAllSupplierOrderRequests = async (): Promise<
    ISupplierOrderRequest[]
> => {
    try {
        const allSupplierOrderRequests = await SupplierOrderRequest.find()
            .populate({
                path: "supplier",
                model: "Supplier",
            })
            .populate({
                path: "order.product",
                model: "Product",
            });
        return allSupplierOrderRequests;
    } catch (error) {
        throw new Error(error.message); // It's good practice to include.message to get the actual error message
    }
};

export const getAllConfirmedSupplierOrderRequestsRepo = async (): Promise<
    ISupplierOrderRequest[]
> => {
    try {
        const allSupplierOrderRequests = await SupplierOrderRequest.find({
            status: "CONFIRMED",
        })
            .populate({
                path: "supplier",
                model: "Supplier",
            })
            .populate({
                path: "order.product",
                model: "Product",
            });
        return allSupplierOrderRequests;
    } catch (error) {
        throw new Error(error.message); // It's good practice to include.message to get the actual error message
    }
};

export const searchSupplierOrderRequestsByOrderId = async (
    orderId: string
): Promise<ISupplierOrderRequest[]> => {
    try {
        const supplierOrderRequests = await SupplierOrderRequest.find({
            orderId,
        });
        return supplierOrderRequests;
    } catch (error) {
        throw new Error(error);
    }
};

export const searchSupplierOrderRequestsBySupplier = async (
    supplierId: string
): Promise<ISupplierOrderRequest[]> => {
    try {
        const supplierOrderRequests = await SupplierOrderRequest.find({
            "supplier._id": supplierId,
        });
        return supplierOrderRequests;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateSupplierOrderRequestStatus = async (
    id: string,
    newStatus: any
): Promise<ISupplierOrderRequest | null> => {
    try {
        console.log("SUPPLIER ORDER REQUEST STATUS UPDATE");
        console.log(newStatus);
        const updatedSupplierOrderRequest =
            await SupplierOrderRequest.findByIdAndUpdate(
                id,
                { status: newStatus.status, reason: newStatus.reason },
                { new: true }
            );
        return updatedSupplierOrderRequest;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteSupplierOrderRequest = async (id: string): Promise<void> => {
    try {
        await SupplierOrderRequest.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const getLastIndexedOrderIdSupplierRepo = async (): Promise<
    string | null
> => {
    try {
        const lastSupplierOrderRequest = await SupplierOrderRequest.findOne({})
            .sort({ orderId: -1 }) // Assuming 'orderId' is the field you want to sort by
            .limit(1); // Limiting the result to just one document
        if (lastSupplierOrderRequest) {
            return lastSupplierOrderRequest.orderId; // Return the orderId of the found document
        } else {
            return null; // Return null if no document is found
        }
    } catch (error) {
        throw new Error("Failed to get last indexed orderId for Supplier");
    }
};

export const updateSupplierOrderRequestRepo = async (
    id: string,
    updateData: Partial<ISupplierOrderRequest>
): Promise<ISupplierOrderRequest | null> => {
    try {
        const updatedSupplierOrderRequest =
            await SupplierOrderRequest.findByIdAndUpdate(id, updateData, {
                new: true,
            })
                .populate({
                    path: "supplier",
                    model: "Supplier",
                })
                .populate({
                    path: "order.product",
                    model: "Product",
                });

        return updatedSupplierOrderRequest;
    } catch (error) {
        throw new Error(
            `Failed to update supplier order request: ${error.message}`
        );
    }
};
