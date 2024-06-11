import { Request, Response } from "express";
import {
    createJobRoleService,
    getJobRolesService,
    getJobRoleByIdService,
    updateJobRoleService,
    deleteJobRoleService,
    updatePermissionsService,
    searchJobRolesByNameService
} from "../services/job_role_service";

export const createJobRoleController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const jobRoleData = req.body;
        const newJobRole = await createJobRoleService(jobRoleData);
        res.status(201).json(newJobRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobRolesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const jobRoles = await getJobRolesService();
        res.status(200).json(jobRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobRoleByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const jobRole = await getJobRoleByIdService(id);
        if (!jobRole) {
            res.status(404).json({ message: "Job role not found" });
            return;
        }
        res.status(200).json(jobRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateJobRoleController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const jobRoleData = req.body;
        const updatedJobRole = await updateJobRoleService(id, jobRoleData);
        if (!updatedJobRole) {
            res.status(404).json({ message: "Job role not found" });
            return;
        }
        res.status(200).json(updatedJobRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteJobRoleController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteJobRoleService(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePermissionsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;
        const updatedJobRole = await updatePermissionsService(id, permissions);
        if (!updatedJobRole) {
            res.status(404).json({ message: "Job role not found" });
            return;
        }
        res.status(200).json(updatedJobRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchJobRolesByNameController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name } = req.query;
        if (!name) {
            res.status(400).json({ message: "Name parameter is required" });
            return;
        }
        const jobRoles = await searchJobRolesByNameService(name.toString());
        res.status(200).json(jobRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

