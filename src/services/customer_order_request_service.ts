import {
    createCustomerOrderRequestRepo,
    getCustomerOrderRequestByIdRepo,
    updateCustomerOrderRequestStatusRepo,
    getAllCustomerOrderRequestsRepo,
    searchCustomerOrderRequestByOrderIdRepo,
    searchCustomerOrderRequestByCustomerRepo,
    getLastIndexedOrderIdRepo,
    updateCustomerOrderRequestRepo,
    getAllCustomerOrderRequestStatusConfirmedRepo,
} from "../data-access/customer_order_request_repo";
import { ICustomerOrderRequest } from "../models/customer_order_request_model";

export const createCustomerOrderRequestService = async (
    orderRequestData: any
): Promise<ICustomerOrderRequest> => {
    try {
        console.log("CREATE CUSTOMER ORDER REQUEST");
        console.log(orderRequestData);

        const lastOrderId = await getLastIndexedOrderIdRepo();
        const orderId = await generateOrderId(lastOrderId);
        const customerOrderRequestToCreate = { ...orderRequestData, orderId };

        const newCustomerOrderRequest = await createCustomerOrderRequestRepo(
            customerOrderRequestToCreate
        );
        return newCustomerOrderRequest;
    } catch (error) {
        throw new Error("Failed to create customer order request");
    }
};

export const generateOrderId = async (lastOrderId: string) => {
    if (!lastOrderId) {
        return "WDC-001";
    }
    const lastId = parseInt(lastOrderId.split("-")[1]);
    const newId = (lastId + 1).toString().padStart(3, "0");
    return `WDC-${newId}`;
};

export const getCustomerOrderRequestByIdService = async (
    _id: string
): Promise<ICustomerOrderRequest | null> => {
    try {
        console.log(_id);
        const customerOrderRequest = await getCustomerOrderRequestByIdRepo(_id);
        return customerOrderRequest;
    } catch (error) {
        throw new Error("Failed to find customer order request");
    }
};

export const updateCustomerOrderRequestStatusService = async (
    orderId: string,
    newStatus: string
): Promise<ICustomerOrderRequest | null> => {
    try {
        const updatedCustomerOrderRequest =
            await updateCustomerOrderRequestStatusRepo(orderId, newStatus);
        return updatedCustomerOrderRequest;
    } catch (error) {
        throw new Error("Failed to update customer order request status");
    }
};

export const getAllCustomerOrderRequestsService = async (): Promise<
    ICustomerOrderRequest[]
> => {
    try {
        const allCustomerOrderRequests =
            await getAllCustomerOrderRequestsRepo();
        return allCustomerOrderRequests;
    } catch (error) {
        throw new Error("Failed to get all customer order requests");
    }
};

export const searchCustomerOrderRequestByOrderIdService = async (
    orderId: string
): Promise<ICustomerOrderRequest[]> => {
    try {
        const customerOrderRequests =
            await searchCustomerOrderRequestByOrderIdRepo(orderId);
        return customerOrderRequests;
    } catch (error) {
        throw new Error("Failed to search customer order request by order id");
    }
};

export const searchCustomerOrderRequestByCustomerService = async (
    customerName: string
): Promise<ICustomerOrderRequest[]> => {
    try {
        const customerOrderRequests =
            await searchCustomerOrderRequestByCustomerRepo(customerName);
        return customerOrderRequests;
    } catch (error) {
        throw new Error(
            "Failed to search customer order request by customer name"
        );
    }
};

export const updateCustomerOrderRequestService = async (
    orderId: string,
    updates: Partial<ICustomerOrderRequest>
): Promise<ICustomerOrderRequest | null> => {
    try {
        const updatedCustomerOrderRequest =
            await updateCustomerOrderRequestRepo(orderId, updates);
        return updatedCustomerOrderRequest;
    } catch (error) {
        throw new Error("Failed to update customer order request");
    }
};

export const getAllCustomerOrderRequestStatusConfirmedService =
    async (): Promise<ICustomerOrderRequest[]> => {
        try {
            const confirmedCustomerOrderRequests =
                await getAllCustomerOrderRequestStatusConfirmedRepo();
            return confirmedCustomerOrderRequests;
        } catch (error) {
            throw new Error(
                "Failed to get all confirmed customer order requests"
            );
        }
    };
