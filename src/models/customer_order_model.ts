import { Document, model, Schema } from "mongoose";
import {
    CustomerOrderRequest,
    ICustomerOrderRequest,
} from "./customer_order_request_model";
import { errorEnum } from "../util/error_utils";
import { IWarehouse, Warehouse } from "./warehouse_model";
import { Customer, ICustomer } from "./customer_model";

export interface ICustomerOrder extends Document {
    orderId: string;
    customerOrderRequest: ICustomerOrderRequest;
    subTotal: number;
    totalTax: number;
    totalDiscount: number;
    netTotal: number;
    status: "PAID" | "NOT PAID";
    warehouse: IWarehouse;
    customer: ICustomer;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerOrderSchema: Schema = new Schema<ICustomerOrder>(
    {
        orderId: {
            type: Schema.Types.String,
            required: [true, "Order id is required"],
            unique: true,
        },
        customerOrderRequest: {
            type: Schema.Types.ObjectId,
            ref: "customer_order_requests",
            // required: [true, "Customer order request is required"],
            validate: {
                async validator(customerOrderRequest) {
                    try {
                        const count = await CustomerOrderRequest.countDocuments(
                            {
                                _id: customerOrderRequest,
                            }
                        );
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_CUSTOMER_ORDER_REQUEST,
            },
        },
        subTotal: {
            type: Schema.Types.Number,
            required: true,
        },
        totalTax: {
            type: Schema.Types.Number,
            required: true,
        },
        totalDiscount: {
            type: Schema.Types.Number,
            required: true,
        },
        netTotal: {
            type: Schema.Types.Number,
            required: true,
        },
        status: {
            type: Schema.Types.String,
            enum: ["PAID", "NOT PAID"],
            default: "NOT PAID",
        },
        warehouse: {
            type: Schema.Types.ObjectId,
            ref: "warehouses",
            validate: {
                async validator(warehouses) {
                    try {
                        const count = await Warehouse.countDocuments({
                            _id: warehouses,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_WAREHOUSE,
            },
        },
    },
    {
        timestamps: true,
        collection: "customer_orders",
    }
);

export const CustomerOrder = model<ICustomerOrder>(
    "CustomerOrder",
    CustomerOrderSchema
);
