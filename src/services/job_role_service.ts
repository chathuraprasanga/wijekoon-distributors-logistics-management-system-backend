import {
    createJobRole,
    getJobRoleById,
    getJobRoles,
    updateJobRole,
    updatePermissions,
    searchJobRolesByName,
    deleteJobRole,
} from "../data-access/job_role_repo";
import { IJobRole } from "../models/job_role_model";
import { getAllEmployeesService } from "./employee_service";
import { getAllUsersService } from "./user_service";

export const createJobRoleService = async (
    jobRoleData: Partial<IJobRole>
): Promise<IJobRole> => {
    try {
        return await createJobRole(jobRoleData);
    } catch (error) {
        throw new Error(`Error creating job role: ${error.message}`);
    }
};

export const getJobRolesService = async (): Promise<IJobRole[]> => {
    try {
        return await getJobRoles();
    } catch (error) {
        throw new Error(`Error getting job roles: ${error.message}`);
    }
};

export const getJobRoleByIdService = async (
    id: string
): Promise<IJobRole | null> => {
    try {
        return await getJobRoleById(id);
    } catch (error) {
        throw new Error(`Error getting job role by ID: ${error.message}`);
    }
};

export const updateJobRoleService = async (
    id: string,
    jobRoleData: Partial<IJobRole>
): Promise<IJobRole | null> => {
    try {
        return await updateJobRole(id, jobRoleData);
    } catch (error) {
        throw new Error(`Error updating job role: ${error.message}`);
    }
};

export const deleteJobRoleService = async (id: string): Promise<void> => {
    try {
        const employees = await getAllEmployeesService({ jobRole: id });
        const users = await getAllUsersService({ role: id });

        if (employees.length > 0 || users.length > 0) {
            throw new Error(
                "Job Role Cannot delete, Job Role has linked to data"
            );
            return;
        }
        await deleteJobRole(id);
    } catch (error) {
        throw error;
    }
};

export const updatePermissionsService = async (
    id: string,
    permissions: string[]
): Promise<IJobRole | null> => {
    try {
        return await updatePermissions(id, permissions);
    } catch (error) {
        throw new Error(`Error updating permissions: ${error.message}`);
    }
};

export const searchJobRolesByNameService = async (
    name: string
): Promise<IJobRole[]> => {
    try {
        return await searchJobRolesByName(name);
    } catch (error) {
        throw new Error(`Error searching job roles by name: ${error.message}`);
    }
};
