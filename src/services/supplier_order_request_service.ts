import {
    createSupplierOrderRequest,
    getSupplierOrderRequestById,
    getAllSupplierOrderRequests,
    searchSupplierOrderRequestsByOrderId,
    searchSupplierOrderRequestsBySupplier,
    updateSupplierOrderRequestStatus,
    deleteSupplierOrderRequest,
    getLastIndexedOrderIdSupplierRepo,
    updateSupplierOrderRequestRepo,
    getAllConfirmedSupplierOrderRequestsRepo,
} from "../data-access/supplier_order_request_repo";
import { ISupplierOrderRequest } from "../models/supplier_order_request_model";

export const createSupplierOrderRequestService = async (
    data: ISupplierOrderRequest
): Promise<ISupplierOrderRequest> => {
    try {
        console.log("CREATE Supplier ORDER REQUEST");
        console.log(data);

        const lastOrderId = await getLastIndexedOrderIdSupplierRepo();
        const orderId = await generateOrderId(lastOrderId);
        const customerOrderRequestToCreate = { ...data, orderId };

        const newCustomerOrderRequest = await createSupplierOrderRequest(
            customerOrderRequestToCreate
        );
        return newCustomerOrderRequest;
    } catch (error) {
        throw new Error(error);
    }
};

const generateOrderId = async (lastOrderId: string) => {
    if (!lastOrderId) {
        return "WDS-001";
    }
    const lastId = parseInt(lastOrderId.split("-")[1]);
    const newId = (lastId + 1).toString().padStart(3, "0");
    return `WDS-${newId}`;
};

export const getSupplierOrderRequestByIdService = async (
    id: string
): Promise<ISupplierOrderRequest | null> => {
    try {
        const supplierOrderRequest = await getSupplierOrderRequestById(id);
        return supplierOrderRequest;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllSupplierOrderRequestsService = async (): Promise<
    ISupplierOrderRequest[]
> => {
    try {
        const allSupplierOrderRequests = await getAllSupplierOrderRequests();
        return allSupplierOrderRequests;
    } catch (error) {
        throw new Error(error);
    }
};

export const searchSupplierOrderRequestsByOrderIdService = async (
    orderId: string
): Promise<ISupplierOrderRequest[]> => {
    try {
        const supplierOrderRequests =
            await searchSupplierOrderRequestsByOrderId(orderId);
        return supplierOrderRequests;
    } catch (error) {
        throw new Error(error);
    }
};

export const searchSupplierOrderRequestsBySupplierService = async (
    supplierId: string
): Promise<ISupplierOrderRequest[]> => {
    try {
        const supplierOrderRequests =
            await searchSupplierOrderRequestsBySupplier(supplierId);
        return supplierOrderRequests;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateSupplierOrderRequestStatusService = async (
    id: string,
    newStatus: string
): Promise<ISupplierOrderRequest | null> => {
    try {
        const updatedSupplierOrderRequest =
            await updateSupplierOrderRequestStatus(id, newStatus);
        return updatedSupplierOrderRequest;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteSupplierOrderRequestService = async (
    id: string
): Promise<void> => {
    try {
        await deleteSupplierOrderRequest(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateSupplierOrderRequestService = async (
    id: string,
    updateData: Partial<ISupplierOrderRequest>
): Promise<ISupplierOrderRequest | null> => {
    try {
        const updatedSupplierOrderRequest =
            await updateSupplierOrderRequestRepo(id, updateData);
        return updatedSupplierOrderRequest;
    } catch (error) {
        throw new Error(
            `Failed to update supplier order request: ${error.message}`
        );
    }
};

export const getAllConfirmedSupplierOrderRequestsService = async (): Promise<
    ISupplierOrderRequest[]
> => {
    try {
        return await getAllConfirmedSupplierOrderRequestsRepo();
    } catch (error) {
        throw new Error(error.message);
    }
};
