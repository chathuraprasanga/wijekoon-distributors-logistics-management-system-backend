import mongoose from "mongoose";
import {
    createCustomerOrder,
    getCustomerOrderByOrderId,
    getAllCustomerOrders,

    searchCustomerOrders,
    updateCustomerOrderStatusRepo,
} from "../data-access/customer_order_repo";
import { ICustomerOrder } from "../models/customer_order_model";
import { createChequeService } from "./cheque_service";
import {
    getCustomerOrderRequestByIdService,
    updateCustomerOrderRequestService,
} from "./customer_order_request_service";
import { createPaymentService } from "./customer_payment_service";
import { getCustomerByIdService } from "./cutomer_service";

// Create a new customer order
export const addCustomerOrder = async (
    customerOrderData: any
): Promise<any> => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // uoppdate customer order request
            const customerOrderRequestData: any = {};
            customerOrderRequestData.id =
                customerOrderData.customerOrderRequest;
            customerOrderRequestData.order = customerOrderData.order;
            customerOrderRequestData.subTotal = customerOrderData.subTotal;
            customerOrderRequestData.totalDiscount =
                customerOrderData.totalDiscount;
            customerOrderRequestData.totalTax = customerOrderData.totalTax;
            customerOrderRequestData.netTotal = customerOrderData.netTotal;
            customerOrderRequestData.status = "COMPLETED";

            console.log("CREATED TO CUSTOMER ORDER REQUEST");
            console.log(customerOrderRequestData);

            const updatedRequest = await updateCustomerOrderRequestService(
                customerOrderRequestData.id,
                customerOrderRequestData
            );
            if (!updatedRequest) {
                throw new Error("Customer Order Request Cannot be Updated");
            }

            // create customer order
            const customerOrder: any = {};
            customerOrder.orderId = customerOrderData.orderId;
            customerOrder.customerOrderRequest =
                customerOrderData.customerOrderRequest;
            customerOrder.subTotal = customerOrderData.subTotal;
            customerOrder.totalDiscount = customerOrderData.totalDiscount;
            customerOrder.totalTax = customerOrderData.totalTax;
            customerOrder.netTotal = customerOrderData.netTotal;
            customerOrder.status = customerOrderData.status;

            const createdCustomerOrder = await createCustomerOrder(
                customerOrder
            );

            if (!createdCustomerOrder) {
                throw new Error("Customer Order Cannot be Created");
            }

            const paymentData: any = {};
            paymentData.customerOrder = createdCustomerOrder._id;
            paymentData.totalPayable =
                customerOrderData.paymentData.totalPayable;
            paymentData.paymentDetails =
                customerOrderData.paymentData.paymentDetails;
            paymentData.outstanding = customerOrderData.paymentData.outstanding;
            paymentData.status = customerOrderData.paymentData.status;

            const createdPayment = await createPaymentService(paymentData);
            if (!createdPayment) {
                throw new Error("Customer Payment cannot be created");
            }

            const customerOrderRequest =
                await getCustomerOrderRequestByIdService(
                    customerOrderData.customerOrderRequest
                );
            console.log(customerOrderData);
            console.log(customerOrderData.customerOrderRequest);
            console.log("CUSTOMER ORDER REQUEST");
            console.log(customerOrderRequest);
            const customer = await getCustomerByIdService(
                customerOrderRequest.customer
            );
            console.log("CUSTOMER");
            console.log(customer);

            const cheques = customerOrderData.paymentData.paymentDetails.filter(
                (data) => data.method === "Cheque"
            );
            const updatedCheques = cheques.map((cheque) => ({
                ...cheque,
                customer: customer._id,
                order: createdCustomerOrder._id,
                status: "PENDING",
            }));

            for (let i = 0; i < updatedCheques.length; i++) {
                await createChequeService(updatedCheques[i]);
            }

            const payload = {
                updatedRequest,
                createdCustomerOrder,
                createdPayment,
            };
            return payload;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new Error(error);
        }
    } catch (error) {
        throw new Error(error);
    }
};

// Get a customer order by orderId
export const getCustomerOrder = async (
    orderId: string
): Promise<ICustomerOrder | null> => {
    try {
        return await getCustomerOrderByOrderId(orderId);
    } catch (error) {
        throw new Error(error);
    }
};

// Get all customer orders
export const getAllCustomerOrdersService = async (): Promise<
    ICustomerOrder[]
> => {
    try {
        return await getAllCustomerOrders();
    } catch (error) {
        throw new Error(error);
    }
};

// Update status of a customer order
export const updateCustomerOrderStatusService = async (
    orderId: string,
    status: string
): Promise<ICustomerOrder | null> => {
    try {
        return await updateCustomerOrderStatusRepo(orderId, status);
    } catch (error) {
        throw new Error(error);
    }
};

// Search customer orders by orderId or customer name
export const searchCustomerOrdersService = async (
    searchTerm: string
): Promise<ICustomerOrder[]> => {
    try {
        return await searchCustomerOrders(searchTerm);
    } catch (error) {
        throw new Error(error);
    }
};
