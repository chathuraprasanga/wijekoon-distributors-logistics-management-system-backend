import { Document, model, Schema } from "mongoose";

export interface ICustomer extends Document {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    phoneSecondary?: string;
    type: "Hardware Store" | "Individual Customer";
    hardwareName?: string;
    address: string;
    notes?: any;
    status: "ACTIVE" | "DEACTIVE";
    isFirstLogin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema: Schema = new Schema<ICustomer>(
    {
        fullName: {
            type: Schema.Types.String,
            required: [true, "Full name is required"],
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: Schema.Types.String,
            required: [true, "Password is required"],
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone is required"],
            unique: true,
        },
        phoneSecondary: {
            type: Schema.Types.String,
        },
        type: {
            type: Schema.Types.String,
            enum: ["Hardware Store", "Individual Customer"],
            required: [true, "Type is required"],
        },
        hardwareName: {
            type: Schema.Types.String,
        },
        address: {
            type: Schema.Types.String,
            required: [true, "Address is required"],
        },
        status: {
            type: Schema.Types.String,
            enum: ["ACTIVE", "DEACTIVE"],
            default: "ACTIVE",
        },
        isFirstLogin: {
            type: Schema.Types.Boolean,
            required: true,
            default: true,
        },
        notes: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
        collection: "customers",
    }
);

export const Customer = model<ICustomer>("Customer", CustomerSchema);
