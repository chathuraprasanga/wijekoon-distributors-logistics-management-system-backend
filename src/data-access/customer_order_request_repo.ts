import { Types } from "mongoose";
import {
    CustomerOrderRequest,
    ICustomerOrderRequest,
} from "../models/customer_order_request_model";

export const createCustomerOrderRequestRepo = async (
    orderRequestData: any
): Promise<ICustomerOrderRequest> => {
    try {
        console.log("CUSTOMER ORDER REQUEST REPO");
        console.log(orderRequestData);
        const newCustomerOrderRequest = await CustomerOrderRequest.create(
            orderRequestData
        );
        return newCustomerOrderRequest;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Failed to create customer order request: ${error.message}`
        );
    }
};

export const getCustomerOrderRequestByIdRepo = async (
    _id: any
): Promise<ICustomerOrderRequest | null> => {
    try {
        console.log("_ID");
        console.log(_id);
        const customerOrderRequest = await CustomerOrderRequest.findOne({
            _id: _id,
        });
        console.log("_ID");
        console.log(customerOrderRequest);
        return customerOrderRequest;
    } catch (error) {
        console.error("Error finding customer order request:", error);
        throw new Error("Failed to find customer order request");
    }
};

export const updateCustomerOrderRequestStatusRepo = async (
    orderId: string,
    newStatus: string
): Promise<ICustomerOrderRequest | null> => {
    try {
        const updatedCustomerOrderRequest =
            await CustomerOrderRequest.findOneAndUpdate(
                { orderId },
                { status: newStatus },
                { new: true }
            );
        return updatedCustomerOrderRequest;
    } catch (error) {
        throw new Error("Failed to update customer order request status");
    }
};

export const getAllCustomerOrderRequestsRepo = async (): Promise<
    ICustomerOrderRequest[]
> => {
    try {
        const allCustomerOrderRequests = await CustomerOrderRequest.find({})
            .populate("customer")
            .populate({
                path: "order.product",
                model: "Product",
            });
        return allCustomerOrderRequests;
    } catch (error) {
        throw new Error("Failed to get all customer order requests");
    }
};

export const getAllCustomerOrderRequestStatusConfirmedRepo = async (): Promise<
    ICustomerOrderRequest[]
> => {
    try {
        const confirmedCustomerOrderRequests = await CustomerOrderRequest.find({
            status: "CONFIRMED",
        })
            .populate("customer")
            .populate({
                path: "order.product",
                model: "Product",
            });
        return confirmedCustomerOrderRequests;
    } catch (error) {
        throw new Error("Failed to get all confirmed customer order requests");
    }
};

export const searchCustomerOrderRequestByOrderIdRepo = async (
    orderId: string
): Promise<ICustomerOrderRequest[]> => {
    try {
        const customerOrderRequests = await CustomerOrderRequest.find({
            orderId,
        });
        return customerOrderRequests;
    } catch (error) {
        throw new Error("Failed to search customer order request by order id");
    }
};

export const searchCustomerOrderRequestByCustomerRepo = async (
    customerName: string
): Promise<ICustomerOrderRequest[]> => {
    try {
        const customerOrderRequests = await CustomerOrderRequest.find({
            "customer.name": customerName,
        }).populate("customer");
        return customerOrderRequests;
    } catch (error) {
        throw new Error(
            "Failed to search customer order request by customer name"
        );
    }
};

export const getLastIndexedOrderIdRepo = async (): Promise<string | null> => {
    try {
        const lastCustomerOrderRequest = await CustomerOrderRequest.findOne({})
            .sort({ orderId: -1 })
            .limit(1);
        if (lastCustomerOrderRequest) {
            return lastCustomerOrderRequest.orderId;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Failed to get last indexed orderId");
    }
};

export const updateCustomerOrderRequestRepo = async (
    orderId: any,
    updates: Partial<ICustomerOrderRequest>
): Promise<ICustomerOrderRequest | null> => {
    try {
        const updatedCustomerOrderRequest =
            await CustomerOrderRequest.findOneAndUpdate(
                { _id: orderId },
                updates,
                { new: true }
            );

        return updatedCustomerOrderRequest;
    } catch (error) {
        console.error("Failed to update customer order request:", error);
        throw new Error("Failed to update customer order request");
    }
};

export const getCustomerOrderRequestsByCustomerIdRepo = async (
    customerId: string
): Promise<ICustomerOrderRequest[]> => {
    try {
        if (!Types.ObjectId.isValid(customerId)) {
            throw new Error("Invalid customer ID");
        }
        const customerOrderRequests = await CustomerOrderRequest.find({
            customer: customerId,
        })
            .populate({ path: "customer", model: "Customer" })
            .populate({ path: "order.product", model: "Product" })
            .exec();
        return customerOrderRequests;
    } catch (error) {
        throw new Error(
            `Error fetching customer order requests: ${error.message}`
        );
    }
};
