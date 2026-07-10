const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} = require("@apollo/server/plugin/landingPage/default");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    // process.env.NODE_ENV === "production"
    //   ? ApolloServerPluginLandingPageProductionDefault({
    //       embed: true,
    //     })
      ApolloServerPluginLandingPageLocalDefault({
          embed: true,
        }),
  ],
});

module.exports = server;