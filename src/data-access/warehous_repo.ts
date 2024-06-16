import mongoose from "mongoose";
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
    stockUpdates: { product: string; quantity: number | string }[],
    type: string
): Promise<IWarehouse | null> => {
    try {
        console.log("update data:", warehouseId, stockUpdates, type);

        // Fetch the warehouse details from the database
        const warehouse = await Warehouse.findById(warehouseId).exec();
        if (!warehouse) {
            console.log("Warehouse not found");
            return null;
        }

        console.log("Initial Warehouse Stock Details:", warehouse.stockDetails);

        // Process each stock update
        stockUpdates.forEach((update, index) => {
            console.log(`Processing update #${index + 1}:`, update);

            if (!update.product || typeof update.quantity !== "number") {
                console.error(
                    `Invalid update structure for update #${index + 1}:`,
                    update
                );
                return;
            }

            // Convert the productId string to an ObjectId before searching
            const objectIdUpdateProduct = new mongoose.Types.ObjectId(update.product);

            // Find the stock item by product ID
            let stockItem = warehouse.stockDetails.find((item) =>
                item.product.equals(objectIdUpdateProduct)
            );

            if (stockItem) {
                console.log("Found stock item:", stockItem);

                if (type === "increment") {
                    stockItem.quantity += parseInt(
                        update.quantity.toString(),
                        10
                    );
                    console.log("Incremented stock item:", stockItem);
                } else if (type === "decrement") {
                    stockItem.quantity -= parseInt(
                        update.quantity.toString(),
                        10
                    );
                    console.log("Decrement stock item:", stockItem);
                }
            } else {
                console.log(
                    "Adding new product to warehouse stock details:",
                    update.product
                );

                // Add the new product if it doesn't already exist in the stock details
                warehouse.stockDetails.push({
                    product: objectIdUpdateProduct,
                    quantity: parseInt(update.quantity.toString(), 10),
                });
                console.log(
                    "Added new product to warehouse stock details:",
                    update.product
                );
            }
        });

        console.log("Updated Warehouse Stock Details:", warehouse.stockDetails);

        // Save the updated warehouse details back to the database
        await warehouse.save();
        return warehouse;
    } catch (error) {
        console.error("Error updating warehouse stock:", error);
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
