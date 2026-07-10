const userTypeDefs = `#graphql

type User {
  _id: ID!
  name: String!
  email: String!
  mobile: String
  address: String
  createdAt: String
  updatedAt: String
}

type UserProfileResponse {
  success: Boolean!
  message: String
  data: User!
}

type Query {
  hello: String
  getProfile: UserProfileResponse
}

type Mutation {
  updateProfile(
     name: String, 
     mobile: String, 
     address: String): UserProfileResponse
     
}

`;

module.exports = userTypeDefs;