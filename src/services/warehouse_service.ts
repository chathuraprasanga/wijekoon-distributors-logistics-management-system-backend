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
import { updateTrip } from "./trip_service";

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
    data: Partial<any>
): Promise<IWarehouse | null> => {
    try {
        console.log("UPDATE WAREHOUSE");
        console.log(id);
        console.log(data);

        // Correctly navigate to supplierOrderRequest
        const supplierOrderRequest =
            data.trip?.supplierOrder?.supplierOrderRequest;
        if (!supplierOrderRequest) {
            throw new Error("Supplier order request is missing");
        }

        const updateStock = data.trip.supplierOrder.supplierOrderRequest.order.map((item) => ({
            product: item.product._id,
            quantity: parseInt(item.quantity),
        }));
        const type = data.type;

        const updatedWarehouse = await updateWarehouseStockService(
            id, // Ensure this matches the expected parameter name
            updateStock,
            type
        );

        // Update Trip
        const tripId = data.trip?._id; // Safely access trip._id
        const status = { status: "COMPLETED" };

        await updateTrip(tripId, status);

        return updatedWarehouse;
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
    stockUpdates: any[],
    type: string
): Promise<IWarehouse | null> => {
    try {
        console.log("UPDATE STOCK DETAILS");
        console.log(warehouseId);
        console.log(stockUpdates);
        return await updateWarehouseStockRepo(warehouseId, stockUpdates, type);
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
