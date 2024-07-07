import { Schema, model } from "mongoose";

export interface IEmail extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EmailSchema: Schema = new Schema<IEmail>(
    {
        name: {
            type: Schema.Types.String,
            required: [true, "Name is required"],
        },
        email: {
            type: Schema.Types.String,
            required: [true, "Email is required"],
        },
        subject: {
            type: Schema.Types.String,
            required: [true, "Subject is required"],
        },
        message: {
            type: Schema.Types.String,
            required: [true, "Subject is required"],
        },
        isRead: {
            type: Schema.Types.Boolean,
        },
    },
    {
        timestamps: true,
        collection: "email",
    }
);

export const Email = model<IEmail>("Email", EmailSchema);
