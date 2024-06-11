import { Schema, Document, model } from "mongoose";
import { IJobRole } from "./job_role_model";

export interface IUser extends Document {
    fullName: string;
    lastName: string;
    email: string;
    password: string;
    role: IJobRole;
    isFirstLogin: boolean;
    status: "ACTIVE" | "INACTIVE";
    isSuperAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        fullName: {
            type: Schema.Types.String,
            required: [true, "Full Name is required"],
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
        role: {
            type: Schema.Types.ObjectId,
            ref: "job_role",
        },
        isFirstLogin: {
            type: Schema.Types.Boolean,
            default: true,
        },
        status: {
            type: Schema.Types.String,
            enum: ["ACTIVE", "DEACTIVE"],
            required: [true, "Status is required"],
        },
        isSuperAdmin: {
            type: Schema.Types.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

export const User = model<IUser>("User", UserSchema);
