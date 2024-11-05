import { gql } from "@apollo/client";

const GET_TASKS  = gql `

query GetAllTasks(){
 getTasks(){
 tasks
 }
}
`
export default GET_TASKS