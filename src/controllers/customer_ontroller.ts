import {
    createCustomerService,
    getCustomerByIdService,
    getAllCustomersService,
    updateCustomerService,
    deleteCustomerService,
    searchCustomersService,
} from "../services/cutomer_service";
import { Request, Response } from "express";
import { ICustomer } from "../models/customer_model";

export const createCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customerData: ICustomer = req.body;
        console.log("CREATE CUSTOMER");
        console.log(customerData);
        const createToCustomer = { ...customerData, status: "ACTIVE" };
        const newCustomer = await createCustomerService(createToCustomer);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const customer = await getCustomerByIdService(id);
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCustomersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customers = await getAllCustomersService();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        console.log(req.body);
        const { id } = req.params;
        const update: Partial<ICustomer> = req.body;
        const updatedCustomer = await updateCustomerService(id, update);
        if (!updatedCustomer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCustomerController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteCustomerService(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchCustomersController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const query = req.query;
        const customers = await searchCustomersService(query);
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
