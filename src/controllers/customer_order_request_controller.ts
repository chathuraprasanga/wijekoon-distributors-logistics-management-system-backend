import { Request, Response } from "express";
import {
    createCustomerOrderRequestService,
    getCustomerOrderRequestByIdService,
    updateCustomerOrderRequestStatusService,
    getAllCustomerOrderRequestsService,
    searchCustomerOrderRequestByOrderIdService,
    searchCustomerOrderRequestByCustomerService,
    updateCustomerOrderRequestService,
    getAllCustomerOrderRequestStatusConfirmedService,
    getCustomerOrderRequestsByCustomerIdService,
} from "../services/customer_order_request_service";
import { ICustomerOrderRequest } from "../models/customer_order_request_model";

export const createCustomerOrderRequestController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newCustomerOrderRequest = await createCustomerOrderRequestService(
            req.body as ICustomerOrderRequest
        );
        res.status(201).json(newCustomerOrderRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerOrderRequestByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { orderId } = req.params;
    try {
        const customerOrderRequest = await getCustomerOrderRequestByIdService(
            orderId
        );
        if (customerOrderRequest) {
            res.status(200).json(customerOrderRequest);
        } else {
            res.status(404).json({
                message: "Customer order request not found",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCustomerOrderRequestStatusController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { orderId } = req.params;
    const { newStatus } = req.body;
    try {
        const updatedCustomerOrderRequest =
            await updateCustomerOrderRequestStatusService(orderId, newStatus);
        if (updatedCustomerOrderRequest) {
            res.status(200).json(updatedCustomerOrderRequest);
        } else {
            res.status(404).json({
                message: "Customer order request not found",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCustomerOrderRequestsController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const allCustomerOrderRequests =
            await getAllCustomerOrderRequestsService();
        res.status(200).json(allCustomerOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchCustomerOrderRequestByOrderIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { orderId } = req.query;
    try {
        const customerOrderRequests =
            await searchCustomerOrderRequestByOrderIdService(orderId as string);
        res.status(200).json(customerOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchCustomerOrderRequestByCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { customerName } = req.query;
    try {
        const customerOrderRequests =
            await searchCustomerOrderRequestByCustomerService(
                customerName as string
            );
        res.status(200).json(customerOrderRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCustomerOrderRequestController = async (
    req: Request,
    res: Response
) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        console.log("CUSTOMER ORDER REQUEST UPDATE CONTROLLER");
        console.log(id);
        const updatedCustomerOrderRequest =
            await updateCustomerOrderRequestService(id, updates);
        console.log("DONE", updatedCustomerOrderRequest);
        if (!updatedCustomerOrderRequest) {
            return res
                .status(404)
                .json({ message: "Customer order request not found" });
        }

        return res.status(200).json(updatedCustomerOrderRequest);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to update customer order request" });
    }
};

export const getConfirmedCustomerOrderRequestsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const confirmedCustomerOrderRequests =
            await getAllCustomerOrderRequestStatusConfirmedService();
        res.status(200).json(confirmedCustomerOrderRequests);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get all confirmed customer order requests",
            error: error.message,
        });
    }
};

export const getCustomerOrderRequestsByCustomerIdController = async (req: Request, res: Response): Promise<void> => {
    const { customerId } = req.params;
    try {
        const customerOrderRequests = await getCustomerOrderRequestsByCustomerIdService(customerId);
        res.status(200).json(customerOrderRequests);
    } catch (error) {
        res.status(500).json({ message: `Controller error fetching customer order requests: ${error.message}` });
    }
};


