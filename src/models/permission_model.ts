import { Schema, Document, model } from "mongoose";

export interface IPermission extends Document {
    module: string;
    description: string;
    code: string,
    createdAt: Date;
    updatedAt: Date;
}

const PermissionSchema: Schema = new Schema<IPermission>(
    {
        module: {
            type: Schema.Types.String,
            required: [true, "Module is required"],
        },
        description: {
            type: Schema.Types.String,
            required: [true, "Description is required"],
        },
        code: {
            type: Schema.Types.String,
            required: [true, "code is required"],
        }
    },
    {
        timestamps: true,
        collection: "permissions",
    }
);

export const Permission = model<IPermission>("Permission", PermissionSchema);
