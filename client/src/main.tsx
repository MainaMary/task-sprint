import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import KanbanBoardProvider from './context/appContext.tsx'
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'

const client = new ApolloClient({
  uri:process.env.NEXT_PUBLIC_BASE_URL,
  cache: new InMemoryCache()
})
// //Wrap your application with the KanbanProvider to provide access to the context.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <KanbanBoardProvider>
      <App />
    </KanbanBoardProvider>
    </ApolloProvider>
    
  </StrictMode>,
)
