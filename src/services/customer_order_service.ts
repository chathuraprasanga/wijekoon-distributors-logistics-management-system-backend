import mongoose from "mongoose";
import {
    createCustomerOrder,
    getCustomerOrderByOrderId,
    getAllCustomerOrders,
    searchCustomerOrders,
    updateCustomerOrderStatusRepo,
    getCustomerOrdersByCustomerIdRepo,
} from "../data-access/customer_order_repo";
import { ICustomerOrder } from "../models/customer_order_model";
import { createChequeService } from "./cheque_service";
import {
    createCustomerOrderRequestService,
    getCustomerOrderRequestByIdService,
    updateCustomerOrderRequestService,
} from "./customer_order_request_service";
import { createPaymentService } from "./customer_payment_service";
import { getCustomerByIdService } from "./cutomer_service";
import { updateWarehouseStockService } from "./warehouse_service";

export const addCustomerOrder = async (
    customerOrderData: any
): Promise<any> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const customerOrderRequestData: any = {
            subTotal: customerOrderData.subTotal,
            totalDiscount: customerOrderData.totalDiscount,
            totalTax: customerOrderData.totalTax,
            netTotal: customerOrderData.netTotal,
            order: customerOrderData.order,
        };

        let updatedRequest;

        if (!customerOrderData.warehouse) {
            customerOrderRequestData.id =
                customerOrderData.customerOrderRequest;
            customerOrderRequestData.status = "COMPLETED";
            console.log(
                "Updating Customer Order Request",
                customerOrderRequestData
            );

            updatedRequest = await updateCustomerOrderRequestService(
                customerOrderRequestData.id,
                customerOrderRequestData
            );
            if (!updatedRequest) {
                throw new Error("Customer Order Request Cannot be Updated");
            }
        } else {
            customerOrderRequestData.status = "WAREHOUSE";
            customerOrderRequestData.customer = customerOrderData.customer;
            customerOrderRequestData.warehouse = customerOrderData.warehouse;
            customerOrderRequestData.expectedDate = null;
            console.log(
                "Creating Customer Order Request",
                customerOrderRequestData
            );

            const updateStock = customerOrderData.order.map((item) => ({
                product: item.product,
                quantity: parseInt(item.quantity),
            }));
            await updateWarehouseStockService(
                customerOrderData.warehouse,
                updateStock,
                "decrement"
            );

            updatedRequest = await createCustomerOrderRequestService(
                customerOrderRequestData
            );
            if (!updatedRequest) {
                throw new Error("Customer Order Request Cannot be Created");
            }
        }

        const customerOrder: any = {
            orderId: customerOrderData.orderId || updatedRequest.orderId,
            customerOrderRequest: updatedRequest._id,
            subTotal: customerOrderData.subTotal,
            totalDiscount: customerOrderData.totalDiscount,
            totalTax: customerOrderData.totalTax,
            netTotal: customerOrderData.netTotal,
            status: customerOrderData.status,
        };

        const createdCustomerOrder = await createCustomerOrder(customerOrder);
        if (!createdCustomerOrder) {
            throw new Error("Customer Order Cannot be Created");
        }

        const paymentData: any = {
            customerOrder: createdCustomerOrder._id,
            totalPayable: customerOrderData.paymentData.totalPayable,
            paymentDetails: customerOrderData.paymentData.paymentDetails,
            outstanding: customerOrderData.paymentData.outstanding,
            status: customerOrderData.paymentData.status,
        };

        const createdPayment = await createPaymentService(paymentData);
        if (!createdPayment) {
            throw new Error("Customer Payment cannot be created");
        }

        let customer;
        if (customerOrderData.customerOrderRequest) {
            const customerOrderRequest =
                await getCustomerOrderRequestByIdService(
                    customerOrderData.customerOrderRequest
                );
            customer = await getCustomerByIdService(
                customerOrderRequest.customer
            );
        } else {
            customer = await getCustomerByIdService(customerOrderData.customer);
        }

        const cheques = customerOrderData.paymentData.paymentDetails
            .filter((data) => data.method === "Cheque")
            .map((cheque) => ({
                ...cheque,
                customer: customer._id,
                order: createdCustomerOrder._id,
                status: "PENDING",
            }));

        for (const cheque of cheques) {
            await createChequeService(cheque);
        }

        await session.commitTransaction();
        session.endSession();

        return {
            updatedRequest,
            createdCustomerOrder,
            createdPayment,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message || error);
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

export const getCustomerOrdersByCustomerIdService = async (customerId: string) => {
    try {
        const customerOrders = await getCustomerOrdersByCustomerIdRepo(customerId);
        return customerOrders;
    } catch (error) {
        throw new Error(`Error in getCustomerOrdersByCustomerIdService: ${error.message}`);
    }
};
