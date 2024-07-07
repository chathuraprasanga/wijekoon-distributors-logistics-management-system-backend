// email_controller.ts
import { Request, Response } from "express";
import * as emailService from "../services/email_service";
import { IEmail } from "../models/email_model";

export const createEmail = async (req: Request, res: Response) => {
    try {
        const data: IEmail = req.body;
        const result = await emailService.createEmail(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to create email", error: error.message });
    }
};

export const getAllEmails = async (req: Request, res: Response) => {
    try {
        const result = await emailService.getAllEmails();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to get all emails", error: error.message });
    }
};

export const updateEmail = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const updateData: any = req.body;
        const result = await emailService.updateEmail(id, updateData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to update email", error: error.message });
    }
};
