const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");


const getProducts = async () => {
    const products = await Product.find();

    return {
        success: true,
        total: products.length,
        data: products,
    }
}

const addProduct = async ({ userId, name, price, description }) => {

    if (!name || !price || !description) {
        throw new AppError("Name, price and description are required.", 400);

    }

    console.log("userId", userId);

    const newProduct = await Product.create({ name, price, description, createdBy: userId });

    newProduct.save();

    return {
        success: true,
        message: "Product added successfully.",
        data: newProduct,
    }
}

const updateProduct = async ({ id, name, price, description }) => {


    // find and update product in mongo db
    const product = await Product.findById(id);

    if (!product) {

        throw new AppError("Product not found.", 404);
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;

    product.save();


    return {
        success: true,
        message: "Product updated successfully.",
        data: product,
    }
}

const deleteProduct = async ({ id }) => {


    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {

        throw new AppError("Product not found.", 404);
    }

    // find and delete product in mongo db
    const pro = await Product.findByIdAndDelete(id);

    if (!pro) {


        throw new AppError("Product not found.", 404);
    }

    return {
        success: true,
        message: "Product deleted successfully.",
        productId: pro._id,
    }

}

const getProductById = async ({ id }) => {

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {

        throw new AppError("Product not found.", 404);

    }

    // Find Product
    const product = await Product.findById(id).populate(
        "createdBy",
        "name email"
    );

    if (product.length === 0) {

        throw new AppError("Product not found.", 404);
    }

    return {
        success: true,
        data: product,
    }

}

const getProductByName = async ({ name }) => {

    if (!name) {
        throw new AppError("Product not found.", 404);
    }

    const products = await Product.find({
        name: { $regex: name, $options: "i" },
    }).populate("createdBy", "name email");

    if (products.length === 0) {

        throw new AppError("Product not found.", 404);
    }

    return {
        success: true,
        data: products,
    }
}

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByName
};