import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

const PORT = 4000;

const resolvers = {
  Query: {
    columns() {
      return db.columns;
    },
  },
  Mutation: {
    addColumn(_, args) {
      let column = {
        ...args.column,
        id: Math.floor(Math.random() * 1000),
      };
      db.columns.push(column);
      return column;
    },
  },
};

const server = new ApolloServer({
  //typeDefs: description of the data types exposed on the Graphs
  //resolvers: functions that handle how to respond to queries and mutations
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});
console.log(`Server ready at port`, PORT, url);
