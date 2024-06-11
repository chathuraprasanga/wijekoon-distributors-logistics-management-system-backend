import { ExpensesRepository } from "../data-access/expenses_repo";
import { IExpenses } from "../models/expenses_mode";

export const ExpensesService = {
    async createExpensesService(expensesData: Partial<IExpenses>): Promise<IExpenses> {
        try {
            const expenses = await ExpensesRepository.createExpenses(
                expensesData
            );
            return expenses;
        } catch (error) {
            throw new Error("Failed to create expenses.");
        }
    },

    async getExpensesByIdService(expensesId: string): Promise<IExpenses | null> {
        try {
            const expenses = await ExpensesRepository.getExpensesById(
                expensesId
            );
            return expenses;
        } catch (error) {
            throw new Error("Failed to get expenses by ID.");
        }
    },

    async updateExpensesService(
        expensesId: string,
        update: Partial<IExpenses>
    ): Promise<IExpenses | null> {
        try {
            const expenses = await ExpensesRepository.updateExpenses(
                expensesId,
                update
            );
            return expenses;
        } catch (error) {
            throw new Error("Failed to update expenses.");
        }
    },

    async deleteExpensesService(expensesId: string): Promise<void> {
        try {
            await ExpensesRepository.deleteExpenses(expensesId);
        } catch (error) {
            throw new Error("Failed to delete expenses.");
        }
    },

    async getAllExpensesService(): Promise<IExpenses[]> {
        try {
            const expenses = await ExpensesRepository.getAllExpenses();
            return expenses;
        } catch (error) {
            throw new Error("Failed to get all expenses.");
        }
    },

    async searchExpensesbyTripIdService(tripId: string): Promise<IExpenses[]> {
        try {
            const expenses = await ExpensesRepository.searchExpensesbyTripId(
                tripId
            );
            return expenses;
        } catch (error) {
            throw new Error("Failed to search expenses by trip ID.");
        }
    },
};
