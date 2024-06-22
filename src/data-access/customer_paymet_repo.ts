import { CustomerOrder } from "../models/customer_order_model";
import { CustomerOrderRequest } from "../models/customer_order_request_model";
import {
    CustomerPayment,
    ICustomerPayment,
} from "../models/customer_payment_mode";

export const createPayment = async (
    paymentData: ICustomerPayment
): Promise<ICustomerPayment> => {
    try {
        const payment = new CustomerPayment(paymentData);
        return await payment.save();
    } catch (error) {
        throw error;
    }
};

export const getPaymentById = async (
    paymentId: string
): Promise<ICustomerPayment | null> => {
    try {
        return await CustomerPayment.findById(paymentId);
    } catch (error) {
        throw error;
    }
};

export const updatePayment = async (
    paymentId: string,
    paymentData: Partial<ICustomerPayment>
): Promise<ICustomerPayment | null> => {
    try {
        return await CustomerPayment.findByIdAndUpdate(paymentId, paymentData, {
            new: true,
        });
    } catch (error) {
        throw error;
    }
};

export const deletePayment = async (paymentId: string): Promise<void> => {
    try {
        await CustomerPayment.findByIdAndDelete(paymentId);
    } catch (error) {
        throw error;
    }
};

export const getAllPaymentsRepo = async (): Promise<ICustomerPayment[]> => {
    try {
        return await CustomerPayment.find()
            .populate({
                path: "customerOrder",
                model: "CustomerOrder",
                populate: [
                    {
                        path: "customerOrderRequest",
                        model: "CustomerOrderRequest",
                        populate: [
                            {
                                path: "customer",
                                model: "Customer",
                            },
                            {
                                path: "order.product",
                                model: "Product",
                            },
                        ],
                    },
                ],
                strictPopulate: false,
            })
            .exec();
    } catch (error) {
        throw error;
    }
};

export const searchPaymentsByOrderIdOrName = async (
    searchTerm: string
): Promise<ICustomerPayment[]> => {
    try {
        const payments = await CustomerPayment.find({
            $or: [
                {
                    "customerOrder.customerOrderRequest.orderId": {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
                {
                    "customerOrder.customerOrderRequest.customer.name": {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
            ],
        });
        return payments;
    } catch (error) {
        throw error;
    }
};

export const getAllCustomerPaymentByCustomerIdRepo = async (
    customerId: string
): Promise<any[]> => {
    try {
        // Find customerOrderRequests associated with the customer
        const customerOrderRequests = await CustomerOrderRequest.find({
            customer: customerId,
        });
        
        // Extract the IDs of the customerOrderRequests
        const customerOrderRequestIds = customerOrderRequests.map(
            (request) => request._id
        );

        // Find customerOrders associated with the customerOrderRequests
        const customerOrders = await CustomerOrder.find({
            customerOrderRequest: { $in: customerOrderRequestIds },
        });
        
        // Extract the IDs of the customerOrders
        const customerOrderIds = customerOrders.map(
            (order) => order._id
        );

        // Find customerPayments associated with the customerOrders
        const customerPayments = await CustomerPayment.find({
            customerOrder: { $in: customerOrderIds },
        })
        .populate({
            path: "customerOrder",
            model: "CustomerOrder",
            populate: {
                path: "customerOrderRequest",
                model: "CustomerOrderRequest",
                populate: [
                    {
                        path: "order.product", // Populating the product within the order
                        model: "Product",
                    },
                    {
                        path: "customer", // Populating the customer
                        model: "Customer",
                    },
                ],
                strictPopulate: false, // Temporarily disable strict population checks
            },
        })
        .exec();

        return customerPayments;
    } catch (error) {
        throw new Error(`Error fetching customer payments: ${error.message}`);
    }
};



