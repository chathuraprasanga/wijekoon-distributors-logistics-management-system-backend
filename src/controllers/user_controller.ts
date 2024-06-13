import { Request, Response } from "express";
import {
    createUserService,
    updateUserService,
    deleteUserService,
    getUserByIdService,
    getAllUsersService,
    loginUserService,
    getRefreshTokenService,
    forgotPasswordService,
} from "../services/user_service";

export const createUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await updateUserService(id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteUserService(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsersController = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await loginUserService(email, password);
        console.log("USER");
        console.log(user);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRefreshTokenController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { oldToken } = req.body;
        const [refreshtoken, user] = await getRefreshTokenService(oldToken);
        if (refreshtoken) {
            res.status(200).json({
                message: "Refresh token created successfully",
                token: refreshtoken,
                user: user,
            });
        } else {
            res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const updatedUser = await forgotPasswordService(email);
        console.log(updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add other necessary functions based on your application's needs
