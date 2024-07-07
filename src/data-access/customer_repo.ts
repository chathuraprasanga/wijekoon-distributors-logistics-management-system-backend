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
        throw error;
    }
};

export const getCustomerById = async (
    customerId: string
): Promise<ICustomer | null> => {
    try {
        return await Customer.findById(customerId).exec();
    } catch (error) {
        throw error;
    }
};

export const getAllCustomers = async (): Promise<ICustomer[]> => {
    try {
        return await Customer.find().exec();
    } catch (error) {
        throw error;
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
        throw error;
    }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
    try {
        await Customer.findByIdAndDelete(customerId).exec();
    } catch (error) {
        throw error;
    }
};

export const searchCustomers = async (
    query: FilterQuery<ICustomer>
): Promise<ICustomer[]> => {
    try {
        return await Customer.find(query).exec();
    } catch (error) {
        throw error;
    }
};

/**
 * Function to get a customer by email
 * @param email - The email of the customer to retrieve
 * @returns The customer document if found, otherwise null
 */
export const getCustomerByEmailRepo = async (email: string): Promise<ICustomer | null> => {
  try {
    // Find the customer by email
    const customer = await Customer.findOne({ email });
    return customer;
  } catch (error) {
    console.error(`Error getting customer by email: ${error.message}`);
    throw new Error("Error getting customer by email");
  }
};

/**
 * Function to get a customer by phone
 * @param phone - The phone number of the customer to retrieve
 * @returns The customer document if found, otherwise null
 */
export const getCustomerByPhoneRepo = async (phone: string): Promise<ICustomer | null> => {
    try {
      // Find the customer by phone
      const customer = await Customer.findOne({ phone });
      return customer;
    } catch (error) {
      console.error(`Error getting customer by phone: ${error.message}`);
      throw new Error("Error getting customer by phone");
    }
  };
  
  
