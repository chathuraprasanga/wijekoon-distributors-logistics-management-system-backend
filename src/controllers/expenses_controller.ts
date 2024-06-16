import { Request, Response } from "express";
import { ExpensesService } from "../services/expenses_service";

export const createExpenses = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const expensesData = req.body;
        const expenses = await ExpensesService.createExpensesService(
            expensesData
        );
        res.status(201).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExpensesById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const expensesId = req.params.id;
        const expenses = await ExpensesService.getExpensesByIdService(
            expensesId
        );
        if (!expenses) {
            res.status(404).json({ message: "Expenses not found" });
            return;
        }
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateExpenses = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const expensesId = req.params.id;
        const update = req.body;
        const expenses = await ExpensesService.updateExpensesService(
            expensesId,
            update
        );
        if (!expenses) {
            res.status(404).json({ message: "Expenses not found" });
            return;
        }
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteExpenses = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const expensesId = req.params.id;
        await ExpensesService.deleteExpensesService(expensesId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllExpenses = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const expenses = await ExpensesService.getAllExpensesService();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchExpensesbyTripId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const tripId = req.params.tripId;
        const expenses = await ExpensesService.searchExpensesbyTripIdService(
            tripId
        );
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
