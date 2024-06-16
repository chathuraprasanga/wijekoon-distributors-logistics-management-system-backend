import { Document, model, Schema } from "mongoose";
import { Customer, ICustomer } from "./customer_model";
import { Product } from "./product_model";
import { errorEnum } from "../util/error_utils";

export interface ICustomerOrderRequest extends Document {
    orderId: string;
    customer: ICustomer;
    expectedDate: string;
    order: {
        product: any;
        quantity: number;
        lineDiscount?: number;
        lineTax?: number;
        lineTotal: number;
    }[];
    subTotal: number;
    totalTax: number;
    totalDiscount: number;
    netTotal: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    createdAt: Date;
    updatedAt: Date;
}

const CustomerOrderRequestSchema: Schema = new Schema<ICustomerOrderRequest>(
    {
        orderId: {
            type: Schema.Types.String,
            required: [true, "Order id is required"],
            unique: true,
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Customer is required"],
            validate: {
                async validator(customer) {
                    try {
                        const count = await Customer.countDocuments({
                            _id: customer,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_CUSTOMER,
            },
        },
        expectedDate: {
            type: Schema.Types.String,
            // required: [true, "Expected date is required"],
        },
        order: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: [true, "Product is required"],
                    validate: {
                        async validator(product) {
                            try {
                                const count = await Product.countDocuments({
                                    _id: product,
                                });
                                return count === 1;
                            } catch (e) {
                                return false;
                            }
                        },
                        message: errorEnum.INVALID_PRODUCT,
                    },
                },
                quantity: {
                    type: Schema.Types.Number,
                    required: [true, "Quantity is required"],
                },
                lineDiscount: {
                    type: Schema.Types.Number,
                    default: 0,
                },
                lineTax: {
                    type: Schema.Types.Number,
                    default: 0,
                },
                lineTotal: {
                    type: Schema.Types.Number,
                    required: [true, "Line total is required"],
                },
            },
        ],
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
            enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "WAREHOUSE"],
            required: [true, "Status is required"],
        }
    },
    {
        timestamps: true,
        collection: "customer_order_requests",
    }
);

export const CustomerOrderRequest = model<ICustomerOrderRequest>("CustomerOrderRequest", CustomerOrderRequestSchema);
