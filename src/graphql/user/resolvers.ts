const queries = {}

const mutations = {
    createUser: async (_: any, { }: {}) => {
        return 'test'
    }
}

export const resolvers = { queries, mutations };