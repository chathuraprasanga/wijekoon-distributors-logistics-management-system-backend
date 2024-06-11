import { Schema, Document, model } from "mongoose";
import { errorEnum } from "../util/error_utils";
import { Customer, ICustomer } from "./customer_model";
import { CustomerOrder, ICustomerOrder } from "./customer_order_model";

export interface ICheques extends Document {
    customer: ICustomer;
    order: ICustomerOrder;
    chequeNumber: string;
    bank: string;
    branch: string;
    amount: number;
    depositDate: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const ChequesSchema: Schema = new Schema<ICheques>(
    {
        customer: {
            type: Schema.Types.ObjectId,
            ref: "customers",
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
        order: {
            type: Schema.Types.ObjectId,
            ref: "orders",
            validate: {
                async validator(order) {
                    try {
                        const count = await CustomerOrder.countDocuments({
                            _id: order,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_CUSTOMER_ORDER,
            },
        },
        chequeNumber: {
            type: Schema.Types.String,
            required: [true, "Cheque number is required"],
        },
        bank: {
            type: Schema.Types.String,
        },
        branch: {
            type: Schema.Types.String,
        },
        amount: {
            type: Schema.Types.Number,
        },
        depositDate: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.String,
            enum: [
                "PENDING",
                "DEPOSITTED",
                "ACCEPTED",
                "REJECTED",
                "RETURNED",
                "SUPPLIER",
            ],
        },
    },
    {
        timestamps: true,
        collection: "cheques",
    }
);

export const Cheques = model<ICheques>("Cheques", ChequesSchema);
