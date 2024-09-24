import './App.css'
import KanbanBoard from './components/Kanban'
import KanbanBoardProvider from './context/appContext'
import BreadCrumb from './components/BreadCrumb'
import Limit from './components/Limit'
function App() {
  return (
    <KanbanBoardProvider>
      <BreadCrumb />
      <Limit />
      <KanbanBoard />
    </KanbanBoardProvider>
  )
}

export default App
