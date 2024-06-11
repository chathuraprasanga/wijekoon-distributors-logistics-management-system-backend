import path from "path";
import { Warehouse, IWarehouse } from "../models/warehouse_model";

export const createWarehouseRepo = async (
    data: Partial<IWarehouse>
): Promise<IWarehouse> => {
    try {
        return await Warehouse.create(data);
    } catch (error) {
        throw new Error(`Failed to create warehouse: ${error}`);
    }
};

export const findWarehouseByIdRepo = async (
    id: string
): Promise<IWarehouse | null> => {
    try {
        return await Warehouse.findById(id).exec();
    } catch (error) {
        throw new Error(`Failed to find warehouse by ID: ${error}`);
    }
};

export const findAllWarehousesRepo = async (): Promise<IWarehouse[]> => {
    try {
        return await Warehouse.find()
            .populate({ path: "stockDetails.product", model: "Product" })
            .exec();
    } catch (error) {
        throw new Error(`Failed to find all warehouses: ${error}`);
    }
};

export const updateWarehouseRepo = async (
    id: string,
    data: Partial<IWarehouse>
): Promise<IWarehouse | null> => {
    try {
        return await Warehouse.findByIdAndUpdate(id, data, {
            new: true,
        }).exec();
    } catch (error) {
        throw new Error(`Failed to update warehouse: ${error}`);
    }
};

export const deleteWarehouseRepo = async (
    id: string
): Promise<IWarehouse | null> => {
    try {
        const result = await Warehouse.findByIdAndDelete(id).exec();
        const deletedWarehouse = result?.value as IWarehouse;
        return deletedWarehouse ?? null;
    } catch (error) {
        throw new Error(`Failed to delete warehouse: ${error}`);
    }
};

export const findWarehousesByCityRepo = async (
    city: string
): Promise<IWarehouse[]> => {
    try {
        return await Warehouse.find({ city }).exec();
    } catch (error) {
        throw new Error(`Failed to find warehouses by city: ${error}`);
    }
};

export const updateWarehouseStockRepo = async (
    warehouseId: string,
    stockUpdates: { productId: string; quantity: number }[]
): Promise<IWarehouse | null> => {
    try {
        const warehouse = await Warehouse.findById(warehouseId).exec();
        if (!warehouse) {
            return null;
        }

        stockUpdates.forEach((update) => {
            const stockItem = warehouse.stockDetails.find(
                (item) => item.product.toString() === update.productId
            );
            if (stockItem) {
                stockItem.quantity += update.quantity;
            }
        });

        await warehouse.save();
        return warehouse;
    } catch (error) {
        throw new Error(`Failed to update warehouse stock: ${error}`);
    }
};

export const getLastIndexWarehouseRepo =
    async (): Promise<IWarehouse | null> => {
        try {
            const warehouses = await Warehouse.find()
                .sort({ _id: -1 })
                .limit(1)
                .exec();
            return warehouses.length > 0 ? warehouses[0] : null;
        } catch (error) {
            throw new Error(`Failed to get last index warehouse: ${error}`);
        }
    };
