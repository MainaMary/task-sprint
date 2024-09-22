import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  //typeDefs: description of the data types exposed on Graphs
  //resolvers: functions that handle how to respond to queries and mutations
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`Server ready at port`, 4000);
