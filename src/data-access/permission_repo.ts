import { Permission, IPermission } from "../models/permission_model";

// Create a new permission
export const createPermission = async (
    permissionData: Partial<IPermission>
): Promise<IPermission> => {
    try {
        const permission = new Permission(permissionData);
        await permission.save();
        return permission;
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

// Get all permissions
export const getPermissions = async (): Promise<IPermission[]> => {
    try {
        return await Permission.find();
    } catch (error) {
        throw new Error(`Unable to retrieve permissions: ${error.message}`);
    }
};

// Get a permission by ID
export const getPermissionById = async (
    id: string
): Promise<IPermission | null> => {
    try {
        return await Permission.findById(id);
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
        const updatedPermission = await Permission.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        return updatedPermission;
    } catch (error) {
        throw new Error(`Unable to update permission: ${error.message}`);
    }
};

// Delete a permission by ID
export const deletePermission = async (
    id: string
): Promise<IPermission | null> => {
    try {
        const result = await Permission.findByIdAndDelete(id) as unknown;
        const deletedPermission = result as IPermission | null;
        return deletedPermission;
    } catch (error) {
        throw new Error(`Unable to delete permission: ${error.message}`);
    }
};

