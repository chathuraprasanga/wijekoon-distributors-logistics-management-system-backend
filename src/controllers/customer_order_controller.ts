import { Request, Response } from "express";
import {
    addCustomerOrder,
    getCustomerOrder,
    getAllCustomerOrdersService,
    updateCustomerOrderStatusService,
    searchCustomerOrdersService,
} from "../services/customer_order_service";
import { ICustomerOrder } from "../models/customer_order_model";

// Create a new customer order
export const createCustomerOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customerOrderData: ICustomerOrder = req.body;
        console.log("CUSTOMER ORDER DATA");
        console.log(customerOrderData);
        const newCustomerOrder = await addCustomerOrder(customerOrderData);
        res.status(201).json(newCustomerOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a customer order by orderId
export const getCustomerOrderController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orderId: string = req.params.orderId;
        const customerOrder = await getCustomerOrder(orderId);
        if (customerOrder) {
            res.status(200).json(customerOrder);
        } else {
            res.status(404).json({ message: "Customer order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all customer orders
export const getAllCustomerOrdersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customerOrders = await getAllCustomerOrdersService();
        res.status(200).json(customerOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update status of a customer order
export const updateCustomerOrderStatusController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orderId: string = req.params.orderId;
        const status: string = req.body.status;
        const updatedCustomerOrder = await updateCustomerOrderStatusService(
            orderId,
            status
        );
        if (updatedCustomerOrder) {
            res.status(200).json(updatedCustomerOrder);
        } else {
            res.status(404).json({ message: "Customer order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search customer orders by orderId or customer name
export const searchCustomerOrdersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const searchTerm: string = req.query.q as string;
        const customerOrders = await searchCustomerOrdersService(searchTerm);
        res.status(200).json(customerOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
