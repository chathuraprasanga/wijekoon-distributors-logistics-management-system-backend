import {
    createProductRepo,
    updateProductRepo,
    deleteProductRepo,
    getProductByIdRepo,
    getAllProductsRepo,
    searchProductsRepo,
} from "../data-access/product_repo";
import { IProduct } from "../models/product_model";

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
        return await deleteProductRepo(productId);
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

export const getAllProductsService = async (): Promise<IProduct[]> => {
    try {
        return await getAllProductsRepo();
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
