import { CustomerOrder } from "../models/customer_order_model";
import { SupplierOrderRequest } from "../models/supplier_order_request_model";
import { Expenses } from "../models/expenses_mode";
import { CustomerPayment } from "../models/customer_payment_mode";
import { SupplierPayment } from "../models/supplier_payment_model";
import { Customer } from "../models/customer_model";
import { Supplier } from "../models/supplier_model";
import { Employee } from "../models/employee_model";
import { Vehicle } from "../models/vehicle_model";
import { CustomerOrderRequest } from "../models/customer_order_request_model";
import { SupplierOrder } from "../models/supplier_order_model";
import { Warehouse } from "../models/warehouse_model";

export const calculateAllCustomerOrdersNetTotal = async () => {
    try {
        // console.log("Starting calculation of all customer orders net total..."); // Debugging log at the start

        // Use the aggregate method to group all documents by $summing the netTotal field
        const result = await CustomerOrder.aggregate([
            {
                $group: {
                    _id: null, // Group all documents together
                    totalNetTotal: { $sum: "$netTotal" }, // Sum up the netTotal field
                },
            },
        ]);

        // console.log("Aggregation result:", result); // Debugging log to inspect the result of the aggregation

        // Check if the result array is not empty and return the totalNetTotal
        if (result && result.length > 0) {
            // console.log("Returning total net total:", result[0].totalNetTotal); // Debugging log before returning the value
            return result[0].totalNetTotal;
        } else {
            // console.log("No customer orders found."); // Debugging log if no orders are found
            throw new Error("No customer orders found");
        }
    } catch (error) {
        console.error(
            "Error calculating net total of all customer orders:",
            error
        ); // Existing error logging
        throw error;
    }
};
export const calculateExpensesTotals = async () => {
    try {
        // Step 1: Sum netTotal across all SupplierOrderRequest documents
        const supplierOrderRequestTotal = await SupplierOrderRequest.aggregate([
            {
                $group: {
                    _id: null, // Group all documents together
                    totalNetTotal: { $sum: "$netTotal" }, // Sum up the netTotal field
                },
            },
        ]);

        // Extract the totalNetTotal from the result
        const supplierOrderRequestNetTotal =
            supplierOrderRequestTotal.length > 0
                ? supplierOrderRequestTotal[0].totalNetTotal
                : 0;

        // Step 2: Sum totalAmount across all Expenses documents
        const expensesTotal = await Expenses.aggregate([
            {
                $group: {
                    _id: null, // Group all documents together
                    totalExpenseAmount: { $sum: "$totalAmount" }, // Sum up the totalAmount field
                },
            },
        ]);

        // Extract the totalExpenseAmount from the result
        const expensesTotalAmount =
            expensesTotal.length > 0 ? expensesTotal[0].totalExpenseAmount : 0;

        // Return the calculated totals
        return {
            supplierOrderRequestNetTotal,
            expensesTotalAmount,
        };
    } catch (error) {
        console.error("Error calculating totals:", error);
        throw error;
    }
};

// Assuming CustomerPayment is imported or defined elsewhere in your project
export const getTotalOutstandingAmount = async (): Promise<number> => {
    const totalOutstanding = await CustomerPayment.aggregate([
        {
            $group: {
                _id: null, // Grouping all documents together
                totalOutstanding: { $sum: "$outstanding" }, // Summing up the outstanding amounts
            },
        },
    ]);

    // Since the aggregation returns an array, we need to extract the first element's totalOutstanding field
    return totalOutstanding.length > 0
        ? totalOutstanding[0].totalOutstanding
        : 0;
};

// Assuming SupplierPayment is imported or defined elsewhere in your project
export const getTotalOutstandingAmountForSuppliers =
    async (): Promise<number> => {
        const totalOutstanding = await SupplierPayment.aggregate([
            {
                $group: {
                    _id: null, // Grouping all documents together
                    totalOutstanding: { $sum: "$outstanding" }, // Summing up the outstanding amounts
                },
            },
        ]);

        // Since the aggregation returns an array, we need to extract the first element's totalOutstanding field
        return totalOutstanding.length > 0
            ? totalOutstanding[0].totalOutstanding
            : 0;
    };

// Assuming Customer is imported or defined elsewhere in your project
export const countCustomers = async (): Promise<number> => {
    const count = await Customer.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countSuppliers = async (): Promise<number> => {
    const count = await Supplier.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countEmployees = async (): Promise<number> => {
    const count = await Employee.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countVehicles = async (): Promise<number> => {
    const count = await Vehicle.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countCustomerOrderRequests = async (): Promise<number> => {
    const count = await CustomerOrderRequest.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countCustomerOrders = async (): Promise<number> => {
    const count = await CustomerOrder.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countSupplierOrderRequests = async (): Promise<number> => {
    const count = await SupplierOrderRequest.countDocuments({});
    return count;
};

// Assuming Customer is imported or defined elsewhere in your project
export const countSupplierOrders = async (): Promise<number> => {
    const count = await SupplierOrder.countDocuments({});
    return count;
};

// Assuming Warehouse is imported or defined elsewhere in your project
export const findWarehousesWithStockDetails = async (): Promise<any[]> => {
    const warehouses = await Warehouse.find({})
        .select("warehouseId city stockDetails")
        .populate({
            path: "stockDetails.product",
            model: "Product",
            select: "_id code  name "
        });

    return warehouses;
};
