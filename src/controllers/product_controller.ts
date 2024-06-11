import { Request, Response } from "express";
import {
    createProductService,
    updateProductService,
    deleteProductService,
    getProductByIdService,
    getAllProductsService,
    searchProductsService,
} from "../services/product_service";
import { IProduct } from "../models/product_model";

export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData: IProduct = req.body;
        const newProduct = await createProductService(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId: string = req.params.id;
        const productData: Partial<IProduct> = req.body;
        const updatedProduct = await updateProductService(productId, productData);
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId: string = req.params.id;
        const result = await deleteProductService(productId);
        if (!result) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId: string = req.params.id;
        const product = await getProductByIdService(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const query: string = req.query.q as string;
        const products = await searchProductsService(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
