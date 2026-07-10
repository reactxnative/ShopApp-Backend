const authService = require("../../services/auth.service");
const throwGraphQLError = require("../../utils/graphqlError");

module.exports = {
    Mutation: {
        signup: async (_, arg) => {
            try {
                const user = await authService.signup(arg);
                return {
                    success: true,
                    message: "User registered successfully.",
                    user,
                };
            } catch (error) {
                throwGraphQLError(error);
            }

        },
         login: async (_, arg) => {
            try {
                const result = await authService.login(arg);
                return result;
            } catch (error) {
                throwGraphQLError(error);
            }
        },
        logout: async (_, arg) => {
            try {
                const result = await authService.logout(arg);
                return result;
            } catch (error) {
                throwGraphQLError(error);
            }
        }
    }
} 