import { Document, model, Schema } from "mongoose";

export interface ISupplier extends Document {
    name: string;
    email: string;
    phone: string;
    secondaryPhone?: string;
    chequePaymentDestination?: string;
    address: string;
    notes?: string;
    status: "ACTIVE" | "DEACTIVE";
    createdAt: Date;
    updatedAt: Date;
}

const SupplierSchema: Schema = new Schema<ISupplier>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Supplier name is required"],
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email is required"],
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone is required"],
        },
        secondaryPhone: {
            type: Schema.Types.String,
        },
        chequePaymentDestination: {
            type: Schema.Types.String,
        },
        address: {
            type: Schema.Types.String,
            required: [true, "Address is required"],
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
        collection: "suppliers",
    }
);

export const Supplier = model<ISupplier>("Supplier", SupplierSchema);
