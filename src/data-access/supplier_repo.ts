import { Supplier, ISupplier } from "../models/supplier_model"; // Adjust the import path as needed

export const createSupplierRepo = async (
    supplierData: ISupplier
): Promise<ISupplier> => {
    return Supplier.create(supplierData);
};

export const getSupplierByIdRepo = async (
    id: string
): Promise<ISupplier | null> => {
    return Supplier.findById(id).exec();
};

export const updateSupplierRepo = async (
    id: string,
    updates: Partial<ISupplier>
): Promise<ISupplier | null> => {
    return Supplier.findByIdAndUpdate(id, updates, { new: true }).exec();
};

export const deleteSupplierRepo = async (id: string): Promise<void> => {
    await Supplier.findByIdAndDelete(id).exec();
};

export const searchSupplierRepo = async (query: string): Promise<ISupplier[]> => {
    return Supplier.find({
        $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { phone: { $regex: query, $options: "i" } },
        ],
    }).exec();
};

export const getAllSuppliersRepo = async (): Promise<ISupplier[]> => {
    return Supplier.find().exec();
};
