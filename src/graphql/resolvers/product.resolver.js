const productService = require("../../services/product.service");
const throwGraphQLError = require("../../utils/graphqlError");
const AppError = require("../../utils/AppError");

module.exports = {
    Query: {
        getProducts: async (_, arg, context) => {
            try {
                const userId = context.user.id;
                if(!userId) {
                    throw new AppError("User not authenticated.", 401);
                }

                const response = await productService.getProducts();
                return response;
            } catch (error) {
                throwGraphQLError(error);
            }
        }
    },
   Mutation: {
        addProduct: async (_, arg, context) => {
            try {
                const userId = context.user.id;
                if(!userId) {
                    throw new AppError("User not authenticated.", 401);
                }
                const response = await productService.addProduct({ userId, ...arg });
                return response;
            } catch (error) {
                throwGraphQLError(error);
            }
        },
        updateProduct: async (_, arg, context) => {
            try {
                const userId = context.user.id;
                if(!userId) {
                    throw new AppError("User not authenticated.", 401);
                }
                const response = await productService.updateProduct({ ...arg });
                return response;
            } catch (error) {
                throwGraphQLError(error);
            }
        },
       
        deleteProduct: async (_, arg, context) => {
            try {
                const userId = context.user.id;
                if(!userId) {
                    throw new AppError("User not authenticated.", 401);
                }
                const response = await productService.deleteProduct({ ...arg });
                return response;
            } catch (error) {
                throwGraphQLError(error);
            }
        },

         getProductById: async (_, arg, context) => {
            try {
                const userId = context.user.id;
                if(!userId) {
                    throw new AppError("User not authenticated.", 401);
                }
                const response = await productService.getProductById({ ...arg });
                return response;
            } catch (error) {
                throwGraphQLError(error);
            }
        },
         searchProductByName: async (_, arg, context) => {
            try {
                const userId = context.user.id;
                if(!userId) {
                    throw new AppError("User not authenticated.", 401);
                }
                const response = await productService.getProductByName({ ...arg });
                return response;
            } catch (error) {
                throwGraphQLError(error);
            }
        },
        
    }
}