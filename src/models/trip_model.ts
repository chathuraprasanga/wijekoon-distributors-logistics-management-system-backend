import { Schema, Document, model } from "mongoose";
import { IVehicle, Vehicle } from "./vehicle_model";
import { Employee, IEmployee } from "./employee_model";
import { errorEnum } from "../util/error_utils";
import { ISupplierOrder, SupplierOrder } from "./supplier_order_model";

export interface ITrip extends Document {
    supplierOrder: ISupplierOrder;
    tripId: string;
    date: string;
    vehicle: IVehicle;
    driver: IEmployee;
    products: number;
    quantity: number;
    purpose: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const TripSchema: Schema = new Schema<ITrip>(
    {
        supplierOrder: {
            type: Schema.Types.ObjectId,
            ref: "supplier_orders",
            validate: {
                async validator(customerOrder) {
                    try {
                        const count = await SupplierOrder.countDocuments({
                            _id: customerOrder,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_SUPPLIER_ORDER,
            },
        },
        tripId: {
            type: Schema.Types.String,
            required: [true, "Trip id is required"],
        },
        date: {
            type: Schema.Types.String,
        },
        vehicle: {
            type: Schema.Types.ObjectId,
            ref: "vehciles",
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
                message: errorEnum.INVALID_EMPLOYEE,
            },
        },
        products: {
            type: Schema.Types.Number,
        },
        quantity: {
            type: Schema.Types.Number,
        },
        purpose: {
            type: Schema.Types.String,
            enum: ["delivery", "warehouse"],
            required: true,
        },
        status: {
            type: Schema.Types.String,
            enum: ["ACTIVE", "DEACTIVE","COMPLETED"],
        },
    },
    {
        timestamps: true,
        collection: "trips",
    }
);

export const Trip = model<ITrip>("Trip", TripSchema);
