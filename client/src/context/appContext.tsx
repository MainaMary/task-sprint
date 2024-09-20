import { ReactNode, useState, useEffect, useContext, createContext, useCallback } from "react";
import { ColumnType, Tasktype } from "../types";
import { generateUniqueId } from "../utils";
interface Props {
    children: ReactNode
}
interface initialStateType {
    allTasks: Tasktype[],
    setAllTasks: React.Dispatch<React.SetStateAction<Tasktype[]>>,
    taskInput: string,
    setTaskInput: React.Dispatch<React.SetStateAction<string>>,
    columns: ColumnType[],
    setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>,
    columnName: string,
    setColumnName: React.Dispatch<React.SetStateAction<string>>,
    isColumnFormOpen: boolean,
    setIsColumnFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleColumnDelete: (x: string | number) => void,
    handleTaskDelete: (x: string) => void,
    clearColumn: (x: string | number) => void,
    addColumn: (event: React.FormEvent<HTMLFormElement>) => void,
    createTask: (columnId: string | number) => void,
    editColumn: {
        id: string | number,
        title: string
    },
    setEditColumn: React.Dispatch<React.SetStateAction<ColumnType>>,
    handleEditColumn: (column: ColumnType) => void
}
const TaskManagerContext = createContext<initialStateType>({
    allTasks: [],
    setAllTasks: () => { },
    taskInput: '',
    setTaskInput: () => { },
    columnName: '',
    setColumnName: () => { },
    columns: [],
    setColumns: () => { },
    isColumnFormOpen: false,
    setIsColumnFormOpen: () => { },
    handleColumnDelete: () => { },
    handleTaskDelete: () => { },
    clearColumn: () => { },
    addColumn: () => { },
    createTask: () => { },
    editColumn: {
        id: '',
        title: ''
    },
    setEditColumn: () => { },
    handleEditColumn: () => { }
});
export const useKanbanBoard = () => {
    const context = useContext(TaskManagerContext)
    if (!context) {
        throw new Error("useKanbanBoard must be used within a KanbanBoardProvider");
    }
    return context;
}

const KanbanBoardProvider = ({ children }: Props) => {
    const initialTasksState = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks') || '')
        : []
    const initialColumnState = localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns') || '')
        : []
    const [allTasks, setAllTasks] = useState<Tasktype[]>(initialTasksState)
    const [columns, setColumns] = useState<ColumnType[]>(initialColumnState)
    const [taskInput, setTaskInput] = useState('')
    const [columnName, setColumnName] = useState('')
    const [isColumnFormOpen, setIsColumnFormOpen] = useState(false)
    const [editColumn, setEditColumn] = useState<ColumnType>(initialColumnState)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(allTasks))
        localStorage.setItem('columns', JSON.stringify(columns))
    }, [allTasks, columns])

    const addColumn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const column = {
            id: generateUniqueId(),
            title: columnName,
        };
        setColumns([...columns, column]);
        setColumnName('')


        setIsColumnFormOpen(false)
    }
    const createTask = (columnId: string | number) => {
        const newTask = {
            id: generateUniqueId(),
            task: taskInput,
            columnId
        }
        setAllTasks([...allTasks, newTask])
    }
    const handleColumnDelete = useCallback((columnId: string | number) => {
        const filteredColumns = columns.filter(column => column.id !== columnId)
        setColumns(filteredColumns)
    }, [columns])

    const handleTaskDelete = useCallback((taskId: string) => {
        const filteredTasks = allTasks.filter(task => task.id !== taskId)
        setAllTasks(filteredTasks)
    }, [allTasks])

    const clearColumn = (columnId: string | number) => {
        const clearTasks = allTasks.filter(task => task.columnId !== columnId)
        setAllTasks(clearTasks)
    }
    const handleEditColumn = (formValue: ColumnType) => {
        const { id, title } = formValue
        const updatedColumns = columns.map(column => column.id === id ? { id, title } : column)
        setColumns(updatedColumns)
    }
    return <TaskManagerContext.Provider value={{ allTasks, setAllTasks, taskInput, setTaskInput, columnName, setColumnName, columns, setColumns, handleColumnDelete, handleTaskDelete, clearColumn, isColumnFormOpen, setIsColumnFormOpen, addColumn, createTask, editColumn, setEditColumn, handleEditColumn }}>{children}</TaskManagerContext.Provider>
}
export default KanbanBoardProvider