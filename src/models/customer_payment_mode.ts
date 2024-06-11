import { Document, model, Schema } from "mongoose";
import { errorEnum } from "../util/error_utils";
import { CustomerOrder, ICustomerOrder } from "./customer_order_model";

export interface ICustomerPayment extends Document {
    customerOrder: ICustomerOrder;
    totalPayable: number;
    paymentDetails: {
        paymentMethod: string;
        bank?: string;
        branch?: string;
        chequeNumber?: string;
        depositDate?: string;
        amount: number;
    }[];
    outstanding: number;
    status: "PAID" | "NOT PAID";
    createdAt: Date;
    updatedAt: Date;
}

const CustomerPaymentSchema: Schema = new Schema<ICustomerPayment>(
    {
        customerOrder: {
            type: Schema.Types.ObjectId,
            ref: "customer_order",
            required: [true, "Customer order is required"],
            validate: {
                async validator(customerOrder) {
                    try {
                        const count = await CustomerOrder.countDocuments({
                            _id: customerOrder,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_CUSTOMER_ORDER,
            },
        },
        totalPayable: {
            type: Schema.Types.Number,
            required: true,
        },
        paymentDetails: [{
            method: {
                type: Schema.Types.String,
                required: [true, "Payment method is required"]
            },
            bank: {
                type: Schema.Types.String,
            },
            branch: {
                type: Schema.Types.String,
            },
            chequeNumber: {
                type: Schema.Types.String,
            },
            depositDate: {
                type: Schema.Types.String,
            },
            amount: {
                type: Schema.Types.Number,
                required: true,
            },
        }],
        outstanding: {
            type: Schema.Types.Number,
            required: true,
        },
        status: {
            type: Schema.Types.String,
            enum: ["PAID", "NOT PAID"],
            default: "NOT PAID"
        }
    },
    {
        timestamps: true,
        collection: "customer_payments",
    }
);

export const CustomerPayment = model<ICustomerPayment>("CustomerPayment", CustomerPaymentSchema);
