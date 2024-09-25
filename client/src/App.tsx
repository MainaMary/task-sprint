import './App.css'
import KanbanBoard from './components/Kanban'
import BreadCrumb from './components/BreadCrumb'
import Limit from './components/Limit'
function App() {
  return (
    <div>
      <BreadCrumb />
      <Limit />
      <KanbanBoard />
    </div>
  )
}

export default App
