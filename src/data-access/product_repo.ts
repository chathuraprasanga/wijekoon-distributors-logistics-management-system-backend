import { Product, IProduct } from "../models/product_model";

export async function createProductRepo(
    productData: IProduct
): Promise<IProduct> {
    try {
        const product = new Product(productData);
        return await product.save();
    } catch (error) {
        throw error;
    }
}

export async function updateProductRepo(
    productId: string,
    productData: Partial<IProduct>
): Promise<IProduct | null> {
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            productData,
            { new: true }
        );
        return product;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error; // Rethrow the error to the calling function
    }
}

export async function deleteProductRepo(productId: string): Promise<boolean> {
    try {
        await Product.findByIdAndDelete(productId);
        return true;
    } catch (error) {
        throw error;
    }
}

export async function getProductByIdRepo(
    productId: string
): Promise<IProduct | null> {
    try {
        const product = await Product.findById(productId).populate("supplier");
        return product;
    } catch (error) {
        throw error;
    }
}

export async function getAllProductsRepo(): Promise<IProduct[]> {
    try {
        const products = await Product.find().populate("supplier");
        return products;
    } catch (error) {
        throw error;
    }
}

export async function searchProductsRepo(query: string): Promise<IProduct[]> {
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { "supplier.name": { $regex: query, $options: "i" } },
            ],
        }).populate("supplier");
        return products;
    } catch (error) {
        throw error;
    }
}
