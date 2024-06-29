import {
    createSupplierRepo,
    getSupplierByIdRepo,
    updateSupplierRepo,
    deleteSupplierRepo,
    searchSupplierRepo,
    getAllSuppliersRepo,
} from "../data-access/supplier_repo"; // Adjust the import path as needed
import { ISupplier } from "../models/supplier_model"; // Adjust the import path as needed
import { getAllProductsService } from "./product_service";

export const createSupplierService = async (
    supplierData: any
): Promise<ISupplier> => {
    try {
        return await createSupplierRepo(supplierData);
    } catch (error) {
        throw new Error(`Failed to create supplier: ${error.message}`);
    }
};

export const getSupplierByIdService = async (
    id: string
): Promise<ISupplier | null> => {
    try {
        return await getSupplierByIdRepo(id);
    } catch (error) {
        throw new Error(`Failed to get supplier by ID: ${error.message}`);
    }
};

export const updateSupplierService = async (
    id: string,
    updates: Partial<ISupplier>
): Promise<ISupplier | null> => {
    try {
        return await updateSupplierRepo(id, updates);
    } catch (error) {
        throw new Error(`Failed to update supplier: ${error.message}`);
    }
};

export const deleteSupplierService = async (id: string): Promise<void> => {
    try {
        const products = await getAllProductsService({ supplier: id });
        if (products.length > 0) {
            throw new Error("Cannot Delete Supplier, Customer has linked data")
        }
        await deleteSupplierRepo(id);
    } catch (error) {
        throw error;
    }
};

export const searchSupplierService = async (
    query: string
): Promise<ISupplier[]> => {
    try {
        return await searchSupplierRepo(query);
    } catch (error) {
        throw new Error(`Failed to search for suppliers: ${error.message}`);
    }
};

export const getAllSuppliersService = async (): Promise<ISupplier[]> => {
    try {
        return await getAllSuppliersRepo();
    } catch (error) {
        throw new Error(`Failed to get all suppliers: ${error.message}`);
    }
};
