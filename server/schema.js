export const typeDefs = `#graphql
type Task {
    id: ID!
    title: String!
    columnId: ID!
}

type Column {
    id: ID!
    title: String!
    tasks: [Task!]!  # An array of Task objects
}
type Query {
    tasks:[Task]
    columns:[Column]
    column(id:ID!): Column
}
`;
