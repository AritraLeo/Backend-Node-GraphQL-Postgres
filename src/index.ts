import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { prismaClient } from './lib/db';
import createApolloGqlServer from './graphql';
import UserService from './services/user.';

const PORT = Number(process.env.PORT) || 8000;

async function init() {

    const app = express();
    const gqlServer = await createApolloGqlServer();

    app.get('/', (req, res) => {
        res.json({ message: 'Hello World!' });
    });

    app.use('/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(gqlServer, {
            context: async ({ req }) => {
                // @ts-ignore
                const token = req.headers['token'];
                try {
                    const user = UserService.decodeToken(token as string);
                    return { user };
                } catch (error) {
                    return {};
                }
            },
        }))

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

init();
