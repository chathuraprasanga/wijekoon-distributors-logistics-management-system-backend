import { IUser, User } from "../models/user_model";
import { JobRole } from "../models/job_role_model";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    try {
        return await User.create(userData);
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
};

export const updateUser = async (
    userId: string,
    update: Partial<IUser>
): Promise<IUser | null> => {
    try {
        console.log("USER", userId, update);
        return await User.findByIdAndUpdate(userId, update, { new: true });
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw new Error(`Failed to get user by ID: ${error}`);
    }
};

export const getAllUsers = async (filters?): Promise<IUser[]> => {
    try {
        return await User.find(filters).populate("role", null, JobRole).exec();
    } catch (error) {
        throw new Error(`Failed to get all users: ${error}`);
    }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        return await User.findOne({ email })
            .populate("role", null, JobRole)
            .exec();
    } catch (error) {
        throw new Error(`Failed to get user by email: ${error}`);
    }
};

// Add other necessary functions based on your application's needs
