import { Schema, Document, model } from "mongoose";
import {
    ISupplierOrderRequest,
    SupplierOrderRequest,
} from "./supplier_order_request_model";
import { errorEnum } from "../util/error_utils";
import { Employee } from "./employee_model";
import { Vehicle } from "./vehicle_model";

export interface ISupplierOrder extends Document {
    supplierOrderRequest: ISupplierOrderRequest;
    tripDetails: any;
    paymentDetails: any;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const SupplierOrderSchema: Schema = new Schema<ISupplierOrder>(
    {
        supplierOrderRequest: {
            type: Schema.Types.ObjectId,
            ref: "supplier_order_requests",
            required: [true, "Supplier order request is required"],
            validate: {
                async validator(orderRequest) {
                    try {
                        const count = await SupplierOrderRequest.countDocuments(
                            {
                                _id: orderRequest,
                            }
                        );
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_SUPPLIER_ORDER_REQUEST,
            },
        },
        tripDetails: {
            date: {
                type: Schema.Types.String,
            },
            vehicle: {
                type: Schema.Types.ObjectId,
                ref: "vehicles",
                validate: {
                    async validator(vehicle) {
                        try {
                            const count = await Vehicle.countDocuments({
                                _id: vehicle,
                            });
                            return count === 1;
                        } catch (e) {
                            return false;
                        }
                    },
                    message: errorEnum.INVALID_VEHICLE,
                },
            },
            driver: {
                type: Schema.Types.ObjectId,
                ref: "employees",
                validate: {
                    async validator(employee) {
                        try {
                            const count = await Employee.countDocuments({
                                _id: employee,
                            });
                            return count === 1;
                        } catch (e) {
                            return false;
                        }
                    },
                    message: errorEnum.INVALID_VEHICLE,
                },
            },
        },
        status: {
            type: Schema.Types.String,
            enum: ["PAID", "NOT PAID"],
        },
        paymentDetails: {
            payments: [{
                method: {
                    type: Schema.Types.String,
                },
                bank: {
                    type: Schema.Types.String,
                },
                branch: {
                    type: Schema.Types.String,
                },
                chequeNumer: {
                    type: Schema.Types.String,
                },
                depositDate: {
                    type: Schema.Types.String,
                },
                amount: {
                    type: Schema.Types.Number,
                }
            }],
            outstanding: {
                type: Schema.Types.Number,
            }
        }
    },
    {
        timestamps: true,
        collection: "supplier_orders",
    }
);

export const SupplierOrder = model<ISupplierOrder>("SupplierOrder", SupplierOrderSchema);
