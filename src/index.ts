import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

const PORT = Number(process.env.PORT) || 8000;

async function init() {

    const app = express();
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey Test GQL server!`
            }
        }
    });

    await gqlServer.start();

    app.get('/', (req, res) => {
        res.json({ message: 'Hello World!' });
    });

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(gqlServer))

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

init();
