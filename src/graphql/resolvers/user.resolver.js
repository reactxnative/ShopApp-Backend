const userService = require("../../services/user.service");
const throwGraphQLError = require("../../utils/graphqlError");

module.exports = {
    Query: {
        getProfile: async (_, arg, context) => {
            try {
                const user = await userService.getProfile(context.user.id);
                return user
            } catch (error) {
                throwGraphQLError(error);
            }
        }
    },
    Mutation: {
        updateProfile: async (_, arg, context) => {
            try {
                const user = await userService.updateProfile(context.user.id, arg.name, arg.mobile, arg.address);
                return user
            } catch (error) {
                throwGraphQLError(error);
            }
        }
    }
}
