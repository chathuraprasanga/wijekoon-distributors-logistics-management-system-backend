import { Request, Response } from "express";
import * as permissionService from "../services/permission_service";
import { IPermission } from "../models/permission_model";

// Create a new permission
export const createPermission = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const permissionData: Partial<IPermission> = req.body;
        const newPermission = await permissionService.createPermission(
            permissionData
        );
        return res.status(201).json(newPermission);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all permissions
export const getPermissions = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const permissions = await permissionService.getPermissions();
        return res.status(200).json(permissions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a permission by ID
export const getPermissionById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id: string = req.params.id;
        const permission = await permissionService.getPermissionById(id);
        if (permission) {
            return res.status(200).json(permission);
        } else {
            return res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a permission by ID
export const updatePermission = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id: string = req.params.id;
        const updateData: Partial<IPermission> = req.body;
        const updatedPermission = await permissionService.updatePermission(
            id,
            updateData
        );
        if (updatedPermission) {
            return res.status(200).json(updatedPermission);
        } else {
            return res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a permission by ID
export const deletePermission = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const id: string = req.params.id;
        const deletedPermission = await permissionService.deletePermission(id);
        if (deletedPermission) {
            return res.status(200).json(deletedPermission);
        } else {
            return res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
