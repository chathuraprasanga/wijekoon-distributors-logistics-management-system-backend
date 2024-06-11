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
