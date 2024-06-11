import { Schema, Document, model } from "mongoose";
import { ISupplier, Supplier } from "./supplier_model";
import { errorEnum } from "../util/error_utils";
import { Product } from "./product_model";

export interface ISupplierOrderRequest extends Document {
    orderId: string;
    supplier: ISupplier;
    expectedDate: string;
    purpose: string;
    order: any;
    totalQuantity: number;
    totalSize: number;
    netTotal: number;
    status: string;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}

const SupplierOrderRequestSchema: Schema = new Schema<ISupplierOrderRequest>(
    {
        orderId: {
            type: Schema.Types.String,
            required: [true, "Order id is required"],
        },
        supplier: {
            type: Schema.Types.ObjectId,
            ref: "suppliers",
            required: [true, "Supplier is required"],
            validate: {
                async validator(supplier) {
                    try {
                        const count = await Supplier.countDocuments({
                            _id: supplier,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_SUPPLIER,
            },
        },
        expectedDate: {
            type: Schema.Types.String,
            required: [true, "Expected date is required"],
        },
        purpose: {
            type: Schema.Types.String,
            enum: ["delivery", "warehouse"],
        },
        order: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
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
                    required: true,
                },
                lineTotal: {
                    type: Schema.Types.Number,
                    required: true,
                },
                lineSize: {
                    type: Schema.Types.Number,
                    required: true,
                },
            },
        ],
        totalQuantity: {
            type: Schema.Types.Number,
            required: true,
        },
        totalSize: {
            type: Schema.Types.Number,
            required: true,
        },
        netTotal: {
            type: Schema.Types.Number,
            required: true,
        },
        status: {
            type: Schema.Types.String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "COMPLETED",
                "REJECTED",
                "CANCELLED",
            ],
        },
        reason: {
            type: Schema.Types.String,
        },
    },
    {
        timestamps: true,
        collection: "supplier_order_request",
    }
);

export const SupplierOrderRequest = model<ISupplierOrderRequest>(
    "SupplierOrderRequest",
    SupplierOrderRequestSchema
);
