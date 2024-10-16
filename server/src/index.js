import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../schema.js";
import db from "../db.js";
import { v4 as uuidv4 } from 'uuid';
const PORT = 4000;

const resolvers = {
  Query: {
    columns() {
      return db.columns;
    },
    tasks(){
      return db.tasks;
    },
    column (_, args){
     return db.columns.find(column => column.id === args.id)
    }
  },
  Mutation:{
    addColumn(_,args){
      let newColumn ={
       ...args.column,
       id: uuidv4()
      }
      db.columns.push(newColumn)
     return newColumn
    },
    deleteColumn(_,args){
      db.columns = db.columns.filter(column => column.id !== args.id)
      return db.columns
    },
    updategame(_,args){
     db.columns = db.columns.map(column =>{
      if(column.id === args.id){
        return{...column,...args.edit}
      }
      return column
     })
     return db.columns.find(column =>column.id === args.id)
    }

  }
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
