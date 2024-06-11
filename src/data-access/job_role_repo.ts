import { JobRole, IJobRole } from "../models/job_role_model";

export const createJobRole = async (
    jobRoleData: Partial<IJobRole>
): Promise<IJobRole> => {
    try {
        const jobRole = new JobRole(jobRoleData);
        return await jobRole.save();
    } catch (error) {
        throw new Error(`Error creating job role: ${error.message}`);
    }
};

export const getJobRoles = async (): Promise<IJobRole[]> => {
    try {
        return await JobRole.find().exec();
    } catch (error) {
        throw new Error(`Error getting job roles: ${error.message}`);
    }
};

export const getJobRoleById = async (id: string): Promise<IJobRole | null> => {
    try {
        return await JobRole.findById(id).exec();
    } catch (error) {
        throw new Error(`Error getting job role by ID: ${error.message}`);
    }
};

export const updateJobRole = async (
    id: string,
    jobRoleData: Partial<IJobRole>
): Promise<IJobRole | null> => {
    try {
        return await JobRole.findByIdAndUpdate(id, jobRoleData, {
            new: true,
        }).exec();
    } catch (error) {
        throw new Error(`Error updating job role: ${error.message}`);
    }
};

export const deleteJobRole = async (id: string): Promise<void> => {
    try {
        await JobRole.findByIdAndDelete(id).exec();
    } catch (error) {
        throw new Error(`Error deleting job role: ${error.message}`);
    }
};

export const updatePermissions = async (
    id: string,
    permissions: string[]
): Promise<IJobRole | null> => {
    try {
        return await JobRole.findByIdAndUpdate(
            id,
            { permissions },
            { new: true }
        ).exec();
    } catch (error) {
        throw new Error(`Error updating permissions: ${error.message}`);
    }
};

export const searchJobRolesByName = async (name: string): Promise<IJobRole[]> => {
    try {
        return await JobRole.find({ name: { $regex: name, $options: "i" } }).exec();
    } catch (error) {
        throw new Error(`Error searching job roles by name: ${error.message}`);
    }
};

