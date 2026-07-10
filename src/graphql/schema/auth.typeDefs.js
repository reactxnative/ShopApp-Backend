const authTypeDefs = `#graphql

type AuthResponse {
  success: Boolean!
  message: String!
  user: User
}

type LoginResponse {
  success: Boolean!
  message: String!
  accessToken: String!
  refreshToken: String!
  user: User!
}

type LogoutResponse {
  success: Boolean!
  message: String!  
  }

type Mutation {
  signup(
    name: String!
    email: String!
    password: String!
  ): AuthResponse!

  login(
    email: String!
    password: String!
  ): LoginResponse!

  logout(
    refreshToken: String!
  ): LogoutResponse! 
}

`;

module.exports = authTypeDefs;