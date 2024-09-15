import UserService, { CreateUserPayload } from './../../services/user.';
const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const token = UserService.getUserToken(payload);
        return token;
    },

    // Always the 3 param in resolver has the context
    getCurrentLoggedInUser: async (_: any, _vars: any, context: any) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
        }
        throw new Error('No token found or invalid token!')
    }
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
}

export const resolvers = { queries, mutations };