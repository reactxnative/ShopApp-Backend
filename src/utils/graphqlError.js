const { GraphQLError } = require("graphql");

const throwGraphQLError = (error) => {
  throw new GraphQLError(error.message, {
    extensions: {
      code: error.code || "INTERNAL_SERVER_ERROR",
      http: {
        status: error.statusCode || 500,
      },
    },
  });
};

module.exports = throwGraphQLError;