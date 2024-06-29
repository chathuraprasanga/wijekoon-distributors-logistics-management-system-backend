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
        const result = await CustomerOrder.aggregate([
            {
                $group: {
                    _id: null,
                    totalNetTotal: { $sum: "$netTotal" },
                },
            },
        ]);

        return result.length > 0 ? result[0].totalNetTotal : 0;
    } catch (error) {
        console.error(
            "Error calculating net total of all customer orders:",
            error
        );
        throw error;
    }
};

export const calculateExpensesTotals = async () => {
    try {
        const supplierOrderRequestTotal = await SupplierOrderRequest.aggregate([
            {
                $group: {
                    _id: null,
                    totalNetTotal: { $sum: "$netTotal" },
                },
            },
        ]);

        const supplierOrderRequestNetTotal =
            supplierOrderRequestTotal.length > 0
                ? supplierOrderRequestTotal[0].totalNetTotal
                : 0;

        const expensesTotal = await Expenses.aggregate([
            {
                $group: {
                    _id: null,
                    totalExpenseAmount: { $sum: "$totalAmount" },
                },
            },
        ]);

        const expensesTotalAmount =
            expensesTotal.length > 0 ? expensesTotal[0].totalExpenseAmount : 0;

        return {
            supplierOrderRequestNetTotal,
            expensesTotalAmount,
        };
    } catch (error) {
        console.error("Error calculating totals:", error);
        throw error;
    }
};

export const getTotalOutstandingAmount = async (): Promise<number> => {
    const totalOutstanding = await CustomerPayment.aggregate([
        {
            $group: {
                _id: null,
                totalOutstanding: { $sum: "$outstanding" },
            },
        },
    ]);

    return totalOutstanding.length > 0
        ? totalOutstanding[0].totalOutstanding
        : 0;
};

export const getTotalOutstandingAmountForSuppliers =
    async (): Promise<number> => {
        const totalOutstanding = await SupplierPayment.aggregate([
            {
                $group: {
                    _id: null,
                    totalOutstanding: { $sum: "$outstanding" },
                },
            },
        ]);

        return totalOutstanding.length > 0
            ? totalOutstanding[0].totalOutstanding
            : 0;
    };

export const countCustomers = async (): Promise<number> => {
    const count = await Customer.countDocuments({});
    return count;
};

export const countSuppliers = async (): Promise<number> => {
    const count = await Supplier.countDocuments({});
    return count;
};

export const countEmployees = async (): Promise<number> => {
    const count = await Employee.countDocuments({});
    return count;
};

export const countVehicles = async (): Promise<number> => {
    const count = await Vehicle.countDocuments({});
    return count;
};

export const countCustomerOrderRequests = async (): Promise<number> => {
    const count = await CustomerOrderRequest.countDocuments({});
    return count;
};

export const countCustomerOrders = async (): Promise<number> => {
    const count = await CustomerOrder.countDocuments({});
    return count;
};

export const countSupplierOrderRequests = async (): Promise<number> => {
    const count = await SupplierOrderRequest.countDocuments({});
    return count;
};

export const countSupplierOrders = async (): Promise<number> => {
    const count = await SupplierOrder.countDocuments({});
    return count;
};

export const findWarehousesWithStockDetails = async (): Promise<any[]> => {
    try {
        const results = await Warehouse.aggregate([
            {
                $unwind: "$stockDetails",
            },
            {
                $group: {
                    _id: "$stockDetails.product",
                    totalQuantity: { $sum: "$stockDetails.quantity" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    code: "$productDetails.code",
                    name: "$productDetails.name",
                    totalQuantity: 1,
                },
            },
            {
                $sort: {
                    totalQuantity: -1,
                },
            },
            {
                $limit: 4,
            },
        ]);

        return results;
    } catch (error) {
        console.error("Error finding warehouses with stock details:", error);
        throw error;
    }
};

export const getMonthlyNetTotalByStatus = async () => {
    try {
        const results = await CustomerOrderRequest.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        isWarehouse: { $eq: ["$status", "WAREHOUSE"] },
                    },
                    netTotal: { $sum: "$netTotal" },
                },
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month",
                    },
                    totals: {
                        $push: {
                            isWarehouse: "$_id.isWarehouse",
                            netTotal: "$netTotal",
                        },
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    warehouseNetTotal: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$totals",
                                    as: "total",
                                    cond: {
                                        $eq: ["$$total.isWarehouse", true],
                                    },
                                },
                            },
                            0,
                        ],
                    },
                    nonWarehouseNetTotal: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$totals",
                                    as: "total",
                                    cond: {
                                        $eq: ["$$total.isWarehouse", false],
                                    },
                                },
                            },
                            0,
                        ],
                    },
                },
            },
            {
                $project: {
                    year: 1,
                    month: 1,
                    warehouseNetTotal: {
                        $ifNull: ["$warehouseNetTotal.netTotal", 0],
                    },
                    nonWarehouseNetTotal: {
                        $ifNull: ["$nonWarehouseNetTotal.netTotal", 0],
                    },
                },
            },
        ]);

        const formattedResults = results.map((result) => {
            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            return {
                month: monthNames[result.month - 1],
                DirectSales: result.nonWarehouseNetTotal,
                WarehoseSales: result.warehouseNetTotal,
            };
        });

        return formattedResults;
    } catch (error) {
        console.error("Error in getMonthlyNetTotalByStatus:", error.message);
        throw new Error(
            `Error calculating monthly net total by status: ${error.message}`
        );
    }
};
