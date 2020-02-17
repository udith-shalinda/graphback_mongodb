
import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'graphql';
import { join } from 'path';
import { createDB } from './db'
import { createCRUDResolversRuntimeContext } from './resolvers/createContext';
import {createMongoDbRuntimeContext} from './new_version/src/createMongoDbRuntimeContext'
import resolvers from './resolvers/generated/note'
import { PubSubConfig } from './new_version/src/service/PubSubConfig';
const MongoClient = require('mongodb').MongoClient;


/**
 * Creates Apollo server
 */
export const createApolloServer = async () => {
    // const db = await createDB();
    const url = "mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/graphql_practice";
    const client = new MongoClient(url, { useNewUrlParser: true });
    // console.log(client);
    const pubSub = new PubSub();

    const typeDefs = loadSchemaFiles(join(__dirname, '/schema/')).join('\n')
    const schema = buildSchema(typeDefs);
    console.log(schema);
    const context = createMongoDbRuntimeContext("Note",schema,client,pubSub as PubSubConfig);
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers,
        context,
        playground: true,
    })

    return apolloServer;
}
