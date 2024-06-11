import { Request, Response } from "express";
import {
    createPaymentService,
    getPaymentByIdService,
    updatePaymentService,
    deletePaymentService,
    getAllPaymentsService,
    searchPaymentsService,
} from "../services/customer_payment_service";

import { ICustomerPayment } from "../models/customer_payment_mode";

export const createCustomerPaymentController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const paymentData: ICustomerPayment = req.body;
        const payment = await createPaymentService(paymentData);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerPaymentByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const paymentId: string = req.params.id;
        const payment = await getPaymentByIdService(paymentId);
        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
        } else {
            res.status(200).json(payment);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCustomerPaymentController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const paymentId: string = req.params.id;
        const paymentData: Partial<ICustomerPayment> = req.body;
        const updatedPayment = await updatePaymentService(
            paymentId,
            paymentData
        );
        if (!updatedPayment) {
            res.status(404).json({ message: "Payment not found" });
        } else {
            res.status(200).json(updatedPayment);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCustomerPaymentController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const paymentId: string = req.params.id;
        await deletePaymentService(paymentId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCustomersPaymentsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const payments = await getAllPaymentsService();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchPaymentsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const searchTerm: string = req.query.searchTerm as string;
        const payments = await searchPaymentsService(searchTerm);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
