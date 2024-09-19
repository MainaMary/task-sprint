import './App.css'
import KanbanBoard from './components/Kanban'
import KanbanBoardProvider from './context/appContext'

function App() {
  return (
    <KanbanBoardProvider>
      <KanbanBoard />
    </KanbanBoardProvider>
  )
}

export default App
