import { CustomerOrder, ICustomerOrder } from "../models/customer_order_model";

// Create a new customer order
export const createCustomerOrder = async (
    customerOrderData: ICustomerOrder
): Promise<ICustomerOrder> => {
    try {
        const newCustomerOrder = new CustomerOrder(customerOrderData);
        return await newCustomerOrder.save();
    } catch (error) {
        throw new Error(error);
    }
};

export const getCustomerOrderByIdRepo = async (
    id: any
): Promise<ICustomerOrder | null> => {
    try {
        console.log("ORDER ID Repo");
        console.log(id);
        const customerOrder = await CustomerOrder.findById({ _id: id }).exec();
        return customerOrder;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get a customer order by orderId
export const getCustomerOrderByOrderId = async (
    orderId: string
): Promise<ICustomerOrder | null> => {
    try {
        return await CustomerOrder.findOne({ orderId }).exec();
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllCustomerOrders = async (): Promise<ICustomerOrder[]> => {
    try {
        return await CustomerOrder.find({})
            .populate({
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
            })
            .exec();
    } catch (error) {
        console.error("Failed to fetch customer orders:", error.message);
        throw new Error(`Failed to fetch customer orders: ${error.message}`);
    }
};

// Update status of a customer order
export const updateCustomerOrderStatusRepo = async (
    _id: string,
    status: string
): Promise<ICustomerOrder | null> => {
    try {
        return await CustomerOrder.findOneAndUpdate(
            { _id },
            { status },
            { new: true }
        ).exec();
    } catch (error) {
        throw new Error(error);
    }
};

// Search customer orders by orderId or customer name
export const searchCustomerOrders = async (
    searchTerm: string
): Promise<ICustomerOrder[]> => {
    try {
        return await CustomerOrder.find({
            $or: [
                { orderId: { $regex: searchTerm, $options: "i" } }, // Search by orderId
                {
                    "customerOrderRequest.customer.name": {
                        $regex: searchTerm,
                        $options: "i",
                    },
                }, // Search by customer name
            ],
        }).exec();
    } catch (error) {
        throw new Error(error);
    }
};
