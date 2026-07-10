const { mergeResolvers } = require("@graphql-tools/merge");

const authResolvers = require("./auth.resolver");
 const userResolvers = require("./user.resolver");
 const productResolvers = require("./product.resolver");

const resolvers = mergeResolvers([authResolvers, 
    userResolvers, 
    productResolvers
]);

module.exports = resolvers;