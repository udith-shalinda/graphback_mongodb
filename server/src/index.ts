import cors from 'cors';
import express from 'express';
import http from 'http';

import { ApolloServer, PubSub } from "apollo-server-express"
import { loadConfig } from 'graphql-config';
import { join } from 'path';

import { createMongoDbRuntimeContext } from './mongo_model/src/createMongoDbRuntimeContext'
import { loadResolversFiles, loadSchemaFiles } from '@graphql-toolkit/file-loading';
const MongoClient = require('mongodb').MongoClient;



async function start() {
  const app = express();

  app.use(cors());

  app.get('/health', (req, res) => res.sendStatus(200));

  const config = await loadConfig({
    extensions: [() => ({ name: 'generate' })]
  });

  const generateConfig = await config!.getDefault().extension('generate');

  // connect to db
  // const db = knex({
  //   client: generateConfig.db.database,
  //   connection: generateConfig.db.dbConfig,
  // })

  const url = "mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/graphql_practice";
  // mongoose.connect(url ,{useNewUrlParser:true})
  // .then(()=>{
  //     console.log("Database connected successfully");
  //     // app.listen(5000);
  // })
  // .catch(()=>{
  //     console.log("Connection failed");
  // });
  const client = new MongoClient(url, { useNewUrlParser: true });
  


  const pubSub = new PubSub();

  const apolloServer = new ApolloServer({
    typeDefs: loadSchemaFiles(join(__dirname, '/schema/')) as any,
    resolvers: loadResolversFiles(join(__dirname, '/resolvers/')) as any,
    context: createMongoDbRuntimeContext(client,pubSub),
    playground: true,
  })

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  const port = process.env.PORT || 4000;

  httpServer.listen({ port }, () => {
    console.log(`🚀  Server ready at http://localhost:${port}/graphql`)
  })
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
