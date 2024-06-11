import { Document, model, Schema } from "mongoose";
import { ISupplier, Supplier } from "./supplier_model";
import { errorEnum } from "../util/error_utils";

export interface IProduct extends Document {
    code: string;
    name: string;
    size: number;
    supplier: ISupplier;
    buyingPrice: number;
    sellingPrice: number;
    imageUrl: string;
    notes: string;
    status: "ACTIVE" | "DEACTIVE";
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
    {
        code: {
            type: Schema.Types.String,
            required: [true, "Code is required"],
        },
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        size: {
            type: Schema.Types.Number,
            required: [true, "Size is required"],
        },
        supplier: {
            type: Schema.Types.ObjectId,
            ref: "Supplier",
            required: [true, "Supplier is required"],
            validate: {
                async validator(supplierId) {
                    try {
                        const count = await Supplier.countDocuments({ _id: supplierId });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_SUPPLIER,
            },
        },
        buyingPrice: {
            type: Schema.Types.Number,
            required: [true, "Buying price is required"],
        },
        sellingPrice: {
            type: Schema.Types.Number,
            required: [true, "Selling price is required"],
        },
        imageUrl: {
            type: Schema.Types.String,
        },
        notes: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.String,
            enum: ["ACTIVE", "DEACTIVE"],
            required: [true, "Status is required"],
        },
    },
    {
        timestamps: true,
        collection: "products",
    }
);

export const Product = model<IProduct>("Product", ProductSchema);
