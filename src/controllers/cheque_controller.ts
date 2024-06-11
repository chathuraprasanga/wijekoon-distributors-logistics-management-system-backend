import { Request, Response } from "express";
import * as chequeService from "../services/cheque_service";
import { getAllPendingChequesService } from "../services/cheque_service";

export const createCheque = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const chequeData = req.body;
        const newCheque = await chequeService.createChequeService(chequeData);
        res.status(201).json(newCheque);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getChequeById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const cheque = await chequeService.getChequeByIdService(id);
        if (cheque) {
            res.status(200).json(cheque);
        } else {
            res.status(404).json({ message: "Cheque not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateChequeById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCheque = await chequeService.updateChequeByIdService(
            id,
            updateData
        );
        if (updatedCheque) {
            res.status(200).json(updatedCheque);
        } else {
            res.status(404).json({ message: "Cheque not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteChequeById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedCheque = await chequeService.deleteChequeByIdService(id);
        if (deletedCheque) {
            res.status(200).json(deletedCheque);
        } else {
            res.status(404).json({ message: "Cheque not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchCheques = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const criteria = req.query;
        const cheques = await chequeService.searchChequesService(criteria);
        res.status(200).json(cheques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCheques = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const cheques = await chequeService.getAllChequesService();
        res.status(200).json(cheques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPendingChequesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const pendingCheques = await getAllPendingChequesService();
        res.status(200).json(pendingCheques);
    } catch (error) {
        res.status(500).json({ message: `Failed to retrieve pending cheques: ${error.message}` });
    }
};
