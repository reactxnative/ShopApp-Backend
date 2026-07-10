const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler')
const productService = require("../services/product.service");

/**
 * Get Products
 */
// const getProducts = (req, res) => {
//   try {
//     const productsData = fs.readFileSync(productsFilePath, "utf8");

//     const products = JSON.parse(productsData);

//     return res.status(200).json({
//       success: true,
//       total: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
const getProducts = asyncHandler(async (req, res) => {
  const response = await productService.getProducts();
  return res.status(200).json(response);
})

/**
 * Add Product
 */
// const addProduct = (req, res) => {
//   try {
//     const { name, price, description } = req.body;

//     if (!name || !price || !description) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, price and description are required.",
//       });
//     }

//     const productsData = fs.readFileSync(productsFilePath, "utf8");
//     const products = JSON.parse(productsData);

//     const newProduct = {
//       id: products.length + 1,
//       name,
//       price,
//       description,
//     };

//     products.push(newProduct);

//     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

//     return res.status(201).json({
//       success: true,
//       message: "Product added successfully.",
//       data: newProduct,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const addProduct = asyncHandler(async (req, res) => {
  const response = await productService.addProduct({ userId: req.user._id, ...req.body });
  return res.status(201).json(response);
})

/**
 * Update Product
 */
// const updateProduct = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, description } = req.body;

//     const productsData = fs.readFileSync(productsFilePath, "utf8");
//     const products = JSON.parse(productsData);

//     const productIndex = products.findIndex((item) => item.id === parseInt(id));

//     if (productIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found.",
//       });
//     }

//     products[productIndex] = {
//       ...products[productIndex],
//       name: name ?? products[productIndex].name,
//       price: price ?? products[productIndex].price,
//       description: description ?? products[productIndex].description,
//     };

//     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully.",
//       data: products[productIndex],
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const updateProduct = asyncHandler(async (req, res) => {
  const response = await productService.updateProduct({ id: req.params.id, ...req.body });
  return res.status(200).json(response);
})

/**
 * Delete Product
 */
// const deleteProduct = (req, res) => {   
//   try {
//     const { id } = req.params;

//     const productsData = fs.readFileSync(productsFilePath, "utf8");
//     const products = JSON.parse(productsData);

//     const productIndex = products.findIndex((item) => item.id === parseInt(id));

//     if (productIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found.",
//       });
//     }

//     products.splice(productIndex, 1);

//     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

//     return res.status(200).json({
//       success: true,
//       message: "Product deleted successfully.",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const deleteProduct = asyncHandler(async (req, res) => {
  const response = await productService.deleteProduct({ id: req.params.id })
  return res.status(200).json(response)

})

/**
 * Get Product by ID
 */
// const getProduct = (req, res) => {
//   try {
//     const { id } = req.params;

//     const productsData = fs.readFileSync(productsFilePath, "utf8");
//     const products = JSON.parse(productsData);

//     const product = products.find((item) => item.id === parseInt(id));

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: product,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


const getProduct = asyncHandler(async (req, res) => {
  const response = await productService.getProductById({id: req.params.id})
  return res.status(200).json(response)
})

/**
 * Need to create api for update product by using patch method and also need to create api for get product by id.
 */
// const updateProductByPatch = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, description } = req.body;

//     const productsData = fs.readFileSync(productsFilePath, "utf8");
//     const products = JSON.parse(productsData);

//     const productIndex = products.findIndex((item) => item.id === parseInt(id));

//     if (productIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found.",
//       });
//     }

//     products[productIndex] = {
//       ...products[productIndex],
//       name: name ?? products[productIndex].name,
//       price: price ?? products[productIndex].price,
//       description: description ?? products[productIndex].description,
//     };

//     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully.",
//       data: products[productIndex],
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// }

const updateProductByPatch = asyncHandler(async (req, res) => {
 const response = await productService.updateProduct({ id: req.params.id,...req.body })
  return res.status(200).json(response)

})

/**
 * Need to create api for search product by name and also need to create api for search product by price range.
 */
// const searchProductByName = (req, res) => {
//   try {
//     const { name } = req.query;

//     const productsData = fs.readFileSync(productsFilePath, "utf8");
//     const products = JSON.parse(productsData);

//     const filteredProducts = products.filter((item) =>
//       item.name.toLowerCase().includes(name.toLowerCase())
//     );

//     return res.status(200).json({
//       success: true,
//       total: filteredProducts.length,
//       data: filteredProducts,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// }

const searchProductByName = asyncHandler(async (req, res) => {
  const response = await productService.getProductByName({name:req.params.name})
  return res.status(200).json(response)
  

})

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  updateProductByPatch,
  searchProductByName,
};
