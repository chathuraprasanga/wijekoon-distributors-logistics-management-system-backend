import {
    getCustomerOrderByIdRepo,
    updateCustomerOrderStatusRepo,
} from "../data-access/customer_order_repo";
import { getCustomerOrderRequestByIdRepo } from "../data-access/customer_order_request_repo";
import {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getAllPaymentsRepo,
    searchPaymentsByOrderIdOrName,
} from "../data-access/customer_paymet_repo";
import { getCustomerById } from "../data-access/customer_repo";

import { ICustomerPayment } from "../models/customer_payment_mode";
import { createChequeService } from "./cheque_service";

export const createPaymentService = async (
    paymentData: ICustomerPayment
): Promise<ICustomerPayment> => {
    try {
        return await createPayment(paymentData);
    } catch (error) {
        throw error;
    }
};

export const getPaymentByIdService = async (
    paymentId: string
): Promise<ICustomerPayment | null> => {
    try {
        return await getPaymentById(paymentId);
    } catch (error) {
        throw error;
    }
};

export const updatePaymentService = async (
    paymentId: string,
    paymentData: Partial<any>
): Promise<any | null> => {
    try {
        const customerOrder = await getCustomerOrderByIdRepo(
            paymentData.customerOrder._id
        );
        if (paymentData.status === "PAID") {
            const status = "PAID";
            const updatedCustomerOrder = await updateCustomerOrderStatusRepo(
                customerOrder._id,
                status
            );
            if (!updatedCustomerOrder) {
                throw new Error("Customer order cannot be updated");
            }
        }
        console.log("CUSTOMER ORDER");
        console.log(customerOrder);

        const customerOrderRequest = await getCustomerOrderRequestByIdRepo(
            customerOrder.customerOrderRequest._id
        );
        if (!customerOrderRequest) {
            throw new Error("Cannot be find order requst");
        }
        const customer = await getCustomerById(
            customerOrderRequest.customer._id
        );
        if (!customer) {
            throw new Error("Customer cannot be find");
        }

        console.log("PAYMENT DATA");
        console.log(paymentData);

        const cheques = paymentData.paymentDetails.filter(
            (data) => data.method === "Cheque"
        );
        const updatedCheques = cheques.map((cheque) => ({
            ...cheque,
            customer: customer._id,
            order: customerOrder._id,
            status: "PENDING",
        }));

        for (let i = 0; i < updatedCheques.length; i++) {
            await createChequeService(updatedCheques[i]);
        }

        return await updatePayment(paymentId, paymentData);
    } catch (error) {
        console.error("An error occurred while updating payment:", error);
        throw error;
    }
};

export const deletePaymentService = async (
    paymentId: string
): Promise<void> => {
    try {
        await deletePayment(paymentId);
    } catch (error) {
        throw error;
    }
};

export const getAllPaymentsService = async (): Promise<ICustomerPayment[]> => {
    try {
        return await getAllPaymentsRepo();
    } catch (error) {
        throw error;
    }
};

export const searchPaymentsService = async (
    searchTerm: string
): Promise<ICustomerPayment[]> => {
    try {
        return await searchPaymentsByOrderIdOrName(searchTerm);
    } catch (error) {
        throw error;
    }
};
