import {
    createWarehouseRepo,
    findWarehouseByIdRepo,
    findAllWarehousesRepo,
    updateWarehouseRepo,
    deleteWarehouseRepo,
    findWarehousesByCityRepo,
    updateWarehouseStockRepo,
    getLastIndexWarehouseRepo,
} from "../data-access/warehous_repo";
import { IWarehouse } from "../models/warehouse_model";

export const createWarehouseService = async (
    data: any
): Promise<IWarehouse> => {
    try {
        const lastWarehouse = await getLastIndexWarehouseService();
        const lastWarehouseId = lastWarehouse?.warehouseId;
        const warehouseId = await generateWarehouseId(lastWarehouseId);
        const payload = { ...data, warehouseId: warehouseId };
        return await createWarehouseRepo(payload);
    } catch (error) {
        throw new Error(`Failed to create warehouse: ${error}`);
    }
};

const generateWarehouseId = async (lastWarehouseId) => {
    const lastId = lastWarehouseId
        ? parseInt(lastWarehouseId.split("-")[1])
        : 0;
    const newId = (lastId + 1).toString().padStart(3, "0");
    return `WDW-${newId}`;
};

export const findWarehouseByIdService = async (
    id: string
): Promise<IWarehouse | null> => {
    try {
        return await findWarehouseByIdRepo(id);
    } catch (error) {
        throw new Error(`Failed to find warehouse by ID: ${error}`);
    }
};

export const findAllWarehousesService = async (): Promise<IWarehouse[]> => {
    try {
        return await findAllWarehousesRepo();
    } catch (error) {
        throw new Error(`Failed to find all warehouses: ${error}`);
    }
};

export const updateWarehouseService = async (
    id: string,
    data: Partial<IWarehouse>
): Promise<IWarehouse | null> => {
    try {
        return await updateWarehouseRepo(id, data);
    } catch (error) {
        throw new Error(`Failed to update warehouse: ${error}`);
    }
};

export const deleteWarehouseService = async (
    id: string
): Promise<IWarehouse | null> => {
    try {
        return await deleteWarehouseRepo(id);
    } catch (error) {
        throw new Error(`Failed to delete warehouse: ${error}`);
    }
};

export const findWarehousesByCityService = async (
    city: string
): Promise<IWarehouse[]> => {
    try {
        return await findWarehousesByCityRepo(city);
    } catch (error) {
        throw new Error(`Failed to find warehouses by city: ${error}`);
    }
};

export const updateWarehouseStockService = async (
    warehouseId: string,
    stockUpdates: { productId: string; quantity: number }[]
): Promise<IWarehouse | null> => {
    try {
        return await updateWarehouseStockRepo(warehouseId, stockUpdates);
    } catch (error) {
        throw new Error(`Failed to update warehouse stock: ${error}`);
    }
};

export const getLastIndexWarehouseService =
    async (): Promise<IWarehouse | null> => {
        try {
            return await getLastIndexWarehouseRepo();
        } catch (error) {
            throw new Error(`Failed to get last index warehouse: ${error}`);
        }
    };
