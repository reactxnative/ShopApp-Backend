const productTypeDefs = `#graphql

type Product {
  _id: ID!
  name: String!
  description: String
  price: Float!
  createdAt: String
  updatedAt: String
}
    
type ProductResponse {
  total: Int
  data: [Product!]!
}

type AddProductResponse {
  success: Boolean!
  message: String!
  data: Product
}

type DeleteProductResponse {
  success: Boolean!
  message: String!
  productId: String!
}

type ProductByIDResponse {
success: Boolean!
  data : Product
}

type Query {
  getProducts: ProductResponse
}

type Mutation {
  addProduct(name: String!, price: Float!, description: String!): AddProductResponse

  updateProduct(
  id: ID!, 
  name: String,
  price: Float, 
  description: String): AddProductResponse

  deleteProduct(id:ID!): DeleteProductResponse
  getProductById(id:ID!):ProductByIDResponse
  searchProductByName(name:String!):ProductResponse
  
}


`;

module.exports = productTypeDefs;