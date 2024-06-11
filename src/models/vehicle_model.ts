import { Schema, Document, model } from "mongoose";

export interface IVehicle extends Document {
    vehicleId: string;
    number: string;
    type: string;
    brand: string;
    capacity: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const VehicleSchema: Schema = new Schema<IVehicle>(
    {
        vehicleId: {
            type: Schema.Types.String,
            required: [true, "Id is require"],
        },
        number: {
            type: Schema.Types.String,
            required: [true, "Number is required"],
        },
        type: {
            type: Schema.Types.String,
            required: [true, "Type is required"],
        },
        brand: {
            type: Schema.Types.String,
            required: [true, "Brand is required"],
        },
        capacity: {
            type: Schema.Types.Number,
            required: [true, "Capacity is required"],
        },
        status: {
            type: Schema.Types.String,
            enum: ["ACTIVE", "DEACTIVE"],
            required: [true, "Status is required"],
        },
    },
    {
        timestamps: true,
        collection: "vehicles",
    }
);

export const Vehicle = model<IVehicle>("Vehicle", VehicleSchema);
