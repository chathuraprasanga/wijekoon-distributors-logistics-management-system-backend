import { Schema, Document, model } from "mongoose";
import { Product } from "./product_model";
import { errorEnum } from "../util/error_utils";

export interface IWarehouse extends Document {
    warehouseId: string;
    city: string;
    address: string;
    status: string;
    stockDetails: any;
    createdAt: Date;
    updatedAt: Date;
}

const WarehouseSchema: Schema = new Schema<IWarehouse>(
    {
        warehouseId: {
            type: Schema.Types.String,
        },
        city: {
            type: Schema.Types.String,
        },
        address: {
            type: Schema.Types.String,
        },
        status: {
            type: Schema.Types.String,
            enum: ["ACTIVE", "DEACTIVE"]
        },
        stockDetails: [{
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
            }
        }]
    },
    {
        timestamps: true,
        collection: "warehouses",
    }
);

export const Warehouse = model<IWarehouse>("Warehouse", WarehouseSchema);
