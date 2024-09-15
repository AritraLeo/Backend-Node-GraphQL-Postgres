import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGqlServer() {
    const gqlServer = new ApolloServer({
        // ${User.queries}
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
            }

            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },

            Mutation: {
                ...User.resolvers.mutations
            }
        }
    });

    await gqlServer.start();

    return gqlServer;
}

export default createApolloGqlServer;