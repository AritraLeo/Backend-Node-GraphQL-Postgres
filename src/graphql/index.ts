import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGqlServer() {
    const gqlServer = new ApolloServer({
        // ${User.queries}
        typeDefs: `
            type Query {
                hello: String
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