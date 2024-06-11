import * as permissionRepository from "../data-access/permission_repo";
import { IPermission } from "../models/permission_model";

// Create a new permission
export const createPermission = async (
    permissionData: Partial<IPermission>
): Promise<IPermission> => {
    try {
        return await permissionRepository.createPermission(permissionData);
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

// Get all permissions
export const getPermissions = async (): Promise<IPermission[]> => {
    try {
        return await permissionRepository.getPermissions();
    } catch (error) {
        throw new Error(`Unable to retrieve permissions: ${error.message}`);
    }
};

// Get a permission by ID
export const getPermissionById = async (
    id: string
): Promise<IPermission | null> => {
    try {
        return await permissionRepository.getPermissionById(id);
    } catch (error) {
        throw new Error(`Unable to retrieve permission: ${error.message}`);
    }
};

// Update a permission by ID
export const updatePermission = async (
    id: string,
    updateData: Partial<IPermission>
): Promise<IPermission | null> => {
    try {
        return await permissionRepository.updatePermission(id, updateData);
    } catch (error) {
        throw new Error(`Unable to update permission: ${error.message}`);
    }
};

// Delete a permission by ID
export const deletePermission = async (
    id: string
): Promise<IPermission | null> => {
    try {
        return await permissionRepository.deletePermission(id);
    } catch (error) {
        throw new Error(`Unable to delete permission: ${error.message}`);
    }
};
