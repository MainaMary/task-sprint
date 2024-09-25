import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import KanbanBoardProvider from './context/appContext.tsx'

// //Wrap your application with the KanbanProvider to provide access to the context.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KanbanBoardProvider>
      <App />
    </KanbanBoardProvider>
  </StrictMode>,
)
