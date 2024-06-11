import {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
} from "../data-access/customer_repo";
import { ICustomer } from "../models/customer_model";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const createCustomerService = async (
    customerData: any
): Promise<ICustomer> => {
    try {
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

        const passwordToHash = createPassword();

        // function for create email for user to inform his username and password
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);
        const customerToCreate = { ...customerData, password: hashedPassword };
        const createdCustomer = await createCustomer(customerToCreate);
        await sendEmailToUser(customerData, passwordToHash);
        return createdCustomer;
    } catch (error) {
        throw new Error(`Failed to create customer: ${error}`);
    }
};

const sendEmailToUser = async (customerData, password) => {
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

Username: ${customerData.email}
Password: ${password}

Best regards,
Wijekoon Distributors`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Message sent to: %s", customerData.email);
    } catch (error) {
        console.error("Error sending email: %s", error);
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
        throw new Error(`Failed to get customer: ${error}`);
    }
};

export const getAllCustomersService = async (): Promise<ICustomer[]> => {
    try {
        return await getAllCustomers();
    } catch (error) {
        throw new Error(`Failed to get all customers: ${error}`);
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
        return await updateCustomer(customerId, payload);
    } catch (error) {
        throw new Error(`Failed to update customer: ${error}`);
    }
};

export const deleteCustomerService = async (
    customerId: string
): Promise<void> => {
    try {
        await deleteCustomer(customerId);
    } catch (error) {
        throw new Error(`Failed to delete customer: ${error}`);
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
