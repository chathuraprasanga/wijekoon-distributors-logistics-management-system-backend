import {
    createProductRepo,
    updateProductRepo,
    deleteProductRepo,
    getProductByIdRepo,
    getAllProductsRepo,
    searchProductsRepo,
} from "../data-access/product_repo";
import { getAllSupplierOrderRequestsByProductId } from "../data-access/supplier_order_request_repo";
import { getAllWarehousesByProductId } from "../data-access/warehous_repo";
import { IProduct } from "../models/product_model";
import { getAllSupplierOrderRequestsService } from "./supplier_order_request_service";

export const createProductService = async (
    productData: IProduct
): Promise<IProduct> => {
    try {
        console.log("PRODUCT CREATE");
        console.log(productData);
        return await createProductRepo(productData);
    } catch (error) {
        throw error;
    }
};

export const updateProductService = async (
    productId: string,
    productData: Partial<IProduct>
): Promise<IProduct | null> => {
    try {
        console.log("UPDATE PRODUCT");
        console.log(productId);
        console.log(productData);
        return await updateProductRepo(productId, productData);
    } catch (error) {
        throw error;
    }
};

export const deleteProductService = async (
    productId: string
): Promise<boolean> => {
    try {
        const supplierOrders = await getAllSupplierOrderRequestsByProductId(
            productId
        );

        const warehouses = await getAllWarehousesByProductId(productId);

        console.log("SUPPLIER ORDERS", supplierOrders);

        if (supplierOrders.length > 0 || warehouses.length > 0) {
            throw new Error("Cannot Delete Product, Product has linked data");
        }

        // return await deleteProductRepo(productId);
        return true;
    } catch (error) {
        throw error;
    }
};

export const getProductByIdService = async (
    productId: string
): Promise<IProduct | null> => {
    try {
        return await getProductByIdRepo(productId);
    } catch (error) {
        throw error;
    }
};

export const getAllProductsService = async (filters?): Promise<IProduct[]> => {
    try {
        return await getAllProductsRepo(filters);
    } catch (error) {
        throw error;
    }
};

export const searchProductsService = async (
    query: string
): Promise<IProduct[]> => {
    try {
        return await searchProductsRepo(query);
    } catch (error) {
        throw error;
    }
};
