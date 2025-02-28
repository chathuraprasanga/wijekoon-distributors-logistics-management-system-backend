import {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomerByEmailRepo,
    getCustomerByPhoneRepo,
} from "../data-access/customer_repo";
import { ICustomer } from "../models/customer_model";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../util/jwtUtil";
import { getAllCustomerOrderRequestsService } from "./customer_order_request_service";

export const createCustomerService = async (
    customerData: any
): Promise<ICustomer> => {
    try {
        const userByEmail = await getCustomerByEmailRepo(customerData.email);
        const userByPhone = await getCustomerByPhoneRepo(customerData.phone);
        if (userByEmail || userByPhone) {
            throw new Error("User Already Exist, Check users email and phone");
            return;
        }

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

        const passwordToHash = customerData?.password || createPassword();

        // function for create email for customer to inform his Customername and password
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);
        const customerToCreate = { ...customerData, password: hashedPassword };
        const createdCustomer = await createCustomer(customerToCreate);
        if (!customerData.password) {
            await sendEmailToCustomer(customerData, passwordToHash);
        }
        return createdCustomer;
    } catch (error) {
        throw error;
    }
};

const sendEmailToCustomer = async (customerData, password) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wijekoondistributor@gmail.com",
            pass: "hnzz wasj oiho lsrb",
        },
    });

    const mailOptions = {
        from: "wijekoondistributor@gmail.com",
        to: customerData.email,
        subject: "Your Account Information",
        text: `Hello ${customerData.fullName},

Your account has been created successfully. Here are your login details:

Customername: ${customerData.email}
Password: ${password}

Best regards,
Wijekoon Distributors`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Message sent to: %s", customerData.email);
    } catch (error) {
        console.log(error);
        throw "Error sending email";
    }
};

export const getCustomerByIdService = async (
    customerId: any
): Promise<ICustomer | null> => {
    try {
        console.log("CUSTOMER ID");
        console.log(customerId);
        return await getCustomerById(customerId);
    } catch (error) {
        throw error;
    }
};

export const getAllCustomersService = async (): Promise<ICustomer[]> => {
    try {
        return await getAllCustomers();
    } catch (error) {
        throw error;
    }
};

export const updateCustomerService = async (
    customerId: string,
    update: Partial<ICustomer>
): Promise<ICustomer | null> => {
    try {
        const payload = update;
        console.log("CUSTOMER UPDATE");
        console.log(update);
        console.log(customerId);

        const customer = await getCustomerByIdService(customerId);

        if (
            payload.email !== customer.email ||
            payload.phone !== customer.phone
        ) {
            const userByEmail = await getCustomerByEmailRepo(payload.email);
            const userByPhone = await getCustomerByPhoneRepo(payload.phone);
            if (userByEmail || userByPhone) {
                throw new Error(
                    "Email or Phone Already Exist, Check email and phone"
                );
                return;
            }
        }

        return await updateCustomer(customerId, payload);
    } catch (error) {
        throw error;
    }
};

export const deleteCustomerService = async (
    customerId: string
): Promise<void> => {
    try {
        const customerOrders = await getAllCustomerOrderRequestsService({
            customer: customerId,
        });
        if (customerOrders.length > 0) {
            throw new Error(
                "Cannot Delete Customer, Customer has Customer Order Requests"
            );
            return;
        }
        await deleteCustomer(customerId);
    } catch (error) {
        throw error;
    }
};

export const searchCustomersService = async (
    query: object
): Promise<ICustomer[]> => {
    try {
        return await searchCustomers(query);
    } catch (error) {
        throw new Error(`Failed to search customers: ${error}`);
    }
};

export const loginCustomerService = async (
    email: string,
    password: string
): Promise<ICustomer | any> => {
    try {
        const customer = await getCustomerByEmailRepo(email);
        console.log(customer);

        if (!customer) {
            throw new Error("Customer does not exist");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            customer.password
        );

        if (!isPasswordValid) {
            throw new Error("Password is incorrect");
        }

        const accessToken = await generateAccessToken(customer);
        const refreshToken = await generateRefreshToken(customer);
        // console.log(token);
        return {
            message: "Login Succesfull",
            accessToken: accessToken,
            refreshToken: refreshToken,
            customer: customer,
        };
    } catch (error) {
        throw error;
    }
};

export const getRefreshTokenService = async (oldToken: string) => {
    try {
        const decodedToken: any = verifyRefreshToken(oldToken);
        const existingCustomer = await getCustomerById(decodedToken._id);
        if (!existingCustomer) {
            throw new Error("Customer not found");
        }
        const newToken = generateRefreshToken(existingCustomer);
        return [newToken, existingCustomer];
    } catch (error) {
        throw new Error(`Failed to get Refresh Token: ${error}`);
    }
};

export const changeCustomerPasswordService = async (
    customerId: string,
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    try {
        const customer = await getCustomerById(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            customer.password
        );
        if (!isPasswordCorrect) {
            throw new Error("Current password is incorrect");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        console.log("CUSTOMER", customer);

        await updateCustomer(customerId, { password: hashedNewPassword });
    } catch (error) {
        throw error;
    }
};
