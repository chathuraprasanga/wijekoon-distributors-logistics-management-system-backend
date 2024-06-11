import { Schema, Document, model } from "mongoose";
import { ITrip, Trip } from "./trip_model";
import { errorEnum } from "../util/error_utils";

export interface IExpenses extends Document {
    tripId: ITrip;
    expenses: any;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

const ExpensesSchema: Schema = new Schema<IExpenses>(
    {
        tripId: {
            type: Schema.Types.ObjectId,
            ref: "trips",
            validate: {
                async validator(trip) {
                    try {
                        const count = await Trip.countDocuments({
                            _id: trip,
                        });
                        return count === 1;
                    } catch (e) {
                        return false;
                    }
                },
                message: errorEnum.INVALID_VEHICLE,
            },
        },
        expenses: [
            {
                description: {
                    type: Schema.Types.String,
                },
                amount: {
                    type: Schema.Types.Number,
                }
            },
        ],
        totalAmount: {
            type: Schema.Types.Number,
        }
    },
    {
        timestamps: true,
        collection: "expenses",
    }
);

export const Expenses = model<IExpenses>("Expenses", ExpensesSchema);
