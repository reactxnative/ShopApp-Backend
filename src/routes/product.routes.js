const express = require("express");

const router = express.Router();

const { getProducts, 
        addProduct, 
        updateProduct, 
        deleteProduct,
        getProduct,
        updateProductByPatch,
        searchProductByName
     } = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");
// Get Product
router.get("/", authMiddleware, getProducts);

// Search Product by Name
router.get("/search", authMiddleware, searchProductByName);

// Get Product by ID
router.get("/:id", authMiddleware, getProduct);

// Update Product by Patch
router.patch("/:id", authMiddleware, updateProductByPatch);
     
// Add Product
router.post("/add", authMiddleware, addProduct);

// Update Product
router.put("/:id", authMiddleware, updateProduct);

// Delete Product
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;    