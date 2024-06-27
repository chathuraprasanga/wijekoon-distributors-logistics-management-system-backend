import { Document, model, Schema } from "mongoose";
import { IJobRole, JobRole } from "./job_role_model";

export interface IEmployee extends Document {
    name: string;
    employeeId: string;
    phone: string;
    phoneSecondary: string;
    email: string;
    jobRole: IJobRole;
    dateOfBirth: string;
    nic: string;
    address: string;
    status: "ACTIVE" | "DEACTIVE";
    createdAt: Date;
    updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema<IEmployee>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        employeeId: {
            type: Schema.Types.String,
            required: [true, "Employee ID is required"],
        },
        phone: {
            type: Schema.Types.String,
            required: [true, "Phone number is required"],
            unique: true,
        },
        phoneSecondary: {
            type: Schema.Types.String,
            unique: true,
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email is required"],
            unique: true,
        },
        nic: {
            type: Schema.Types.String,
            required: [true, "NIC is required"],
            unique: true,
        },
        dateOfBirth: {
            type: Schema.Types.String,
            required: [true, "Date of Birth is required"],
        },
        jobRole: {
            type: Schema.Types.ObjectId,
            ref: "JobRole",
            validate: {
                async validator(jobRole) {
                    if (!jobRole) {
                        return true;
                    }
                    try {
                        const count = await JobRole.countDocuments({
                            _id: jobRole,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: "Job Role is invalid",
            },
        },
        address: {
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
        collection: "employees",
    }
);

export const Employee = model<IEmployee>("Employee", EmployeeSchema);
