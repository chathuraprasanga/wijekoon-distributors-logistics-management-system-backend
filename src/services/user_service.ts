import { IUser } from "./../models/user_model";
import bcrypt from "bcrypt";
import {
    createUser,
    getUserByEmail,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
} from "../data-access/user_repo";
import nodemailer from "nodemailer";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../util/jwtUtil";

export const createUserService = async (
    userData: Partial<IUser>
): Promise<IUser> => {
    try {
        // Function to create a password if userdata doesn't have one
        const createPassword = () => {
            const generateRandomCharacter = (charset) => {
                return charset[Math.floor(Math.random() * charset.length)];
            };

            const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
            const numbers = "0123456789";
            const allCharacters = uppercaseLetters + lowercaseLetters + numbers;

            let password = "";
            password += generateRandomCharacter(uppercaseLetters);
            password += generateRandomCharacter(lowercaseLetters);
            password += generateRandomCharacter(numbers);

            for (let i = 0; i < 4; i++) {
                password += generateRandomCharacter(allCharacters);
            }

            password += "@";

            return password;
        };

        // Generate a password if none is provided
        const passwordToHash = userData?.password
            ? userData.password
            : createPassword();

        // function for create email for user to inform his username and password
        await sendEmailToUser(userData, passwordToHash);
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);
        console.log("USERDATA");
        console.log(userData);
        const userToCreate = { ...userData, password: hashedPassword };
        return await createUser(userToCreate);
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
};

const sendEmailToUser = async (userData, password) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wijekoondistributor@gmail.com",
            pass: "hnzz wasj oiho lsrb", // Make sure to replace with your actual password
        },
    });

    const mailOptions = {
        from: "wijekoondistributor@gmail.com",
        to: userData.email,
        subject: "Your Account Information",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 24px; color: #333; margin-bottom: 15px;">Welcome to Wijekoon Distributors</h1>
                    <p style="font-size: 16px; color: #666;">Your account has been created successfully.</p>
                </div>
                <div style="line-height: 1.6; color: #333;">
                    <p>Here are your login details:</p>
                    <div style="margin-top: 40px; text-align: center;">
                        <strong style="font-size: 20px; color: #007bff; display: block; margin-bottom: 10px;">Username:</strong> ${userData.email}<br>
                        <span style="font-size: 14px; color: #999;">Password:</span> ${password}
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px; color: #777;">
                    <p>Best regards,</p>
                    <strong style="font-size: 18px;">Wijekoon Distributors</strong>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Message sent to: %s", userData.email);
    } catch (error) {
        console.error("Error sending email: %s", error);
    }
};

export const updateUserService = async (
    userId: string,
    update: any
): Promise<IUser | null> => {
    try {
        console.log("UPDATED USER");
        console.log(userId, update);
        return await updateUser(userId, update);
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
};

export const deleteUserService = async (userId: string): Promise<void> => {
    try {
        await deleteUser(userId);
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
};

export const getUserByIdService = async (
    userId: string
): Promise<IUser | null> => {
    try {
        return await getUserById(userId);
    } catch (error) {
        throw new Error(`Failed to get user by ID: ${error}`);
    }
};

export const getAllUsersService = async (): Promise<IUser[]> => {
    try {
        return await getAllUsers();
    } catch (error) {
        throw new Error(`Failed to get all users: ${error}`);
    }
};

export const loginUserService = async (
    email: string,
    password: string
): Promise<IUser | any> => {
    try {
        const user = await getUserByEmail(email);
        console.log(user);

        if (!user) {
            throw new Error("User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Password is incorrect");
        }

        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        // console.log(token);
        return {
            message: "Login Succesfull",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
        };
    } catch (error) {
        throw new Error(`Failed to login user: ${error}`);
    }
};

export const getRefreshTokenService = async (oldToken: string) => {
    try {
        const decodedToken: any = verifyRefreshToken(oldToken);
        const existingUser = await getUserById(decodedToken._id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        const newToken = generateRefreshToken(existingUser);
        return [newToken, existingUser];
    } catch (error) {
        throw new Error(`Failed to get Refresh Token: ${error}`);
    }
};

export const forgotPasswordService = async (email: string) => {
    try {
        console.log("FORGOT PASSWORD");
        console.log(email);
        const user = await getUserByEmail(email);
        console.log(user);
        if (!user) {
            throw new Error("User Doesnt exist check email");
        }
        const username = user.email;
        const newPassword = createPassword();

        await sendForgotPasswordEmailToUser(username, newPassword);

        const password = await bcrypt.hash(newPassword, 10);
        const updateToUser = { password };
        return await updateUserService(user._id, updateToUser);
    } catch (error) {
        throw new Error(`Failed to Send email`);
    }
};

const createPassword = () => {
    const generateRandomCharacter = (charset) => {
        return charset[Math.floor(Math.random() * charset.length)];
    };

    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers;

    let password = "";
    password += generateRandomCharacter(uppercaseLetters);
    password += generateRandomCharacter(lowercaseLetters);
    password += generateRandomCharacter(numbers);

    for (let i = 0; i < 4; i++) {
        password += generateRandomCharacter(allCharacters);
    }

    password += "@";

    return password;
};

const sendForgotPasswordEmailToUser = async (username, password) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wijekoondistributor@gmail.com",
            pass: "hnzz wasj oiho lsrb", // Make sure to replace with your actual password
        },
    });

    const mailOptions = {
        from: "wijekoondistributor@gmail.com",
        to: username,
        subject: "Your Account Information",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 24px; color: #333; margin-bottom: 15px;">Welcome to Wijekoon Distributors</h1>
                    <p style="font-size: 16px; color: #666;">Your Password has been Changed.</p>
                </div>
                <div style="line-height: 1.6; color: #333;">
                    <p>Here are your new login details:</p>
                    <div style="margin-top: 40px; text-align: center;">
                        <strong style="font-size: 20px; color: #007bff; display: block; margin-bottom: 10px;">Username:</strong> ${username}<br>
                        <span style="font-size: 14px; color: #999;">Password:</span> ${password}
                    </div>
                </div>
                <div style="text-align: center; margin-top: 30px; color: #777;">
                    <p>Best regards,</p>
                    <strong style="font-size: 18px;">Wijekoon Distributors</strong>
                </div>
            </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Message sent to: %s", username);
    } catch (error) {
        console.error("Error sending email: %s", error);
    }
};
// Add other necessary functions based on your application's needs
