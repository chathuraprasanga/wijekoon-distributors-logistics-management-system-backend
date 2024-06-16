import { Expenses, IExpenses } from "../models/expenses_mode";

export const ExpensesRepository = {
    async createExpenses(expensesData: Partial<IExpenses>): Promise<IExpenses> {
        const expenses = await Expenses.create(expensesData);
        return expenses;
    },

    async getExpensesById(expensesId: string): Promise<IExpenses | null> {
        const expenses = await Expenses.findById(expensesId);
        return expenses;
    },

    async updateExpenses(
        expensesId: string,
        update: Partial<IExpenses>
    ): Promise<IExpenses | null> {
        const expenses = await Expenses.findByIdAndUpdate(expensesId, update, {
            new: true,
        });
        return expenses;
    },

    async deleteExpenses(expensesId: string): Promise<void> {
        await Expenses.findByIdAndDelete(expensesId);
    },

    async getAllExpenses(): Promise<IExpenses[]> {
        const expenses = await Expenses.find()
            .populate({
                path: "tripId",
                model: "Trip", // Path to the first level of nesting
                populate: [
                    {
                        path: "driver", // Nested path under tripId
                        model: "Employee",
                    },
                    {
                        path: "supplierOrder", // Another nested path under tripId
                        model: "SupplierOrder",
                        populate: {
                            path: "supplierOrderRequest",
                            model: "SupplierOrderRequest",
                        },
                    },
                    {
                        path: "vehicle", // Another nested path under tripId
                        model: "Vehicle",
                    },
                ],
            })
            .exec(); // Execute the query
        return expenses;
    },

    async searchExpensesbyTripId(tripId: string): Promise<IExpenses[]> {
        const expenses = await Expenses.find({ tripId });
        return expenses;
    },
};
