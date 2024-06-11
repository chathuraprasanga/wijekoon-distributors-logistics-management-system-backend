import { FilterQuery, UpdateQuery } from "mongoose";
import { ICustomer, Customer } from "../models/customer_model";

export const createCustomer = async (
    customerData: ICustomer
): Promise<ICustomer> => {
    try {
        const customer = new Customer(customerData);
        await customer.save();
        return customer;
    } catch (error) {
        throw new Error(`Failed to create customer: ${error}`);
    }
};

export const getCustomerById = async (
    customerId: string
): Promise<ICustomer | null> => {
    try {
        return await Customer.findById(customerId).exec();
    } catch (error) {
        throw new Error(`Failed to get customer: ${error}`);
    }
};

export const getAllCustomers = async (): Promise<ICustomer[]> => {
    try {
        return await Customer.find().exec();
    } catch (error) {
        throw new Error(`Failed to get all customers: ${error}`);
    }
};

export const updateCustomer = async (
    customerId: string,
    update: UpdateQuery<ICustomer>
): Promise<ICustomer | null> => {
    try {
        return await Customer.findByIdAndUpdate(customerId, { $set: update }, {
            new: true,
        }).exec();
    } catch (error) {
        // Assuming the error has a 'message' property that provides useful details
        throw new Error(`Failed to update customer: ${error.message}`);
    }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
    try {
        await Customer.findByIdAndDelete(customerId).exec();
    } catch (error) {
        throw new Error(`Failed to delete customer: ${error}`);
    }
};

export const searchCustomers = async (
    query: FilterQuery<ICustomer>
): Promise<ICustomer[]> => {
    try {
        return await Customer.find(query).exec();
    } catch (error) {
        throw new Error(`Failed to search customers: ${error}`);
    }
};
