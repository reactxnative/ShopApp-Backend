const {mergeTypeDefs} = require("@graphql-tools/merge");

const authTypeDefs = require("./auth.typeDefs");
const userTypeDefs = require("./user.typeDefs");
const productTypeDefs = require("./product.typeDefs");

const typeDefs = mergeTypeDefs([
    authTypeDefs, 
    userTypeDefs, 
    productTypeDefs
]);

module.exports = typeDefs;