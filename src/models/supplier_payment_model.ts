import { Document, model, Schema } from "mongoose";
import { errorEnum } from "../util/error_utils";
import { ISupplierOrder, SupplierOrder } from "./supplier_order_model";

export interface IsupplierPayment extends Document {
    supplierOrder: ISupplierOrder;
    totalPayable: number;
    payments: {
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

const SupplierPaymentSchema: Schema = new Schema<IsupplierPayment>(
    {
        supplierOrder: {
            type: Schema.Types.ObjectId,
            ref: "supplier_order",
            required: [true, "supplier order is required"],
            validate: {
                async validator(supplierOrder) {
                    try {
                        const count = await SupplierOrder.countDocuments({
                            _id: supplierOrder,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_SUPPLIER_ORDER,
            },
        },
        totalPayable: {
            type: Schema.Types.Number,
            required: true,
        },
        payments: [{
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
        collection: "supplier_payments",
    }
);

export const SupplierPayment = model<IsupplierPayment>("SupplierPayment", SupplierPaymentSchema);
