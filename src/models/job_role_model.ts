import { Document, model, Schema } from "mongoose";

export interface IJobRole extends Document {
    name: string;
    permissions: any[];
    createdAt: Date;
    updatedAt: Date;
}

const JobRoleSchema: Schema = new Schema<IJobRole>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Role name is required"],
        },
        permissions: [
            {
                type: Schema.Types.String,
            }
        ]
    },
    {
        timestamps: true,
        collection: "job_roles",
    }
);

export const JobRole = model<IJobRole>("JobRole", JobRoleSchema);
