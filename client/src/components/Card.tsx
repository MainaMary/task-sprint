import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ColumnType, Tasktype } from "../types";
import { useKanbanBoard } from "../context/appContext";
import { MdDelete } from "react-icons/md";
interface Props {
    item: ColumnType, addTask: (id: string
        | number
    ) => void,
    taskInput: string, setTaskInput: React.Dispatch<React.SetStateAction<string>>,
    tasks: Tasktype[]

}
const Card = ({ item, addTask, taskInput, setTaskInput, tasks }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskForm, setTaskForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [newColumnName, setColumnName] = useState('')
    const { handleTaskDelete, handleColumnDelete, clearColumn, addColumn, handleEditColumn } = useKanbanBoard()
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleTaskForm = () => {
        setTaskForm(true)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(event.target.value);
    };
    const openEdit = () => {
        setIsEditing(prev => !prev)



    }
    const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value)

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTask(item.id)
        setTaskForm(false)
        setTaskInput('')
    }
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let newColumn = {
            id: item.id,
            title: newColumnName
        }
        handleEditColumn(newColumn)
        setIsEditing(false)
        setIsOpen(false)

    }
    return (
        <div>
            <p>{item.id}</p>
            <div className="flex justify-between h-auto items-center">
                {isEditing && <form onSubmit={handleFormSubmit}>
                    <input type="text" onChange={handleColumnChange} value={newColumnName} />
                    <button>Edit</button>
                </form>}
                <p> {item.title} </p>
                <BsThreeDotsVertical onClick={handleOpen} />
            </div>
            <div>
                {isOpen && (
                    <ul>
                        <li onClick={() => clearColumn(item.id)}>Clear</li>
                        <li onClick={openEdit}>Update</li>
                        <li onClick={() => handleColumnDelete(item.id)}>Delete</li>
                    </ul>
                )}
            </div>
            {tasks?.length > 0 && tasks?.map(task => <ul key={task.id}>
                <li>{task.task}</li>
                <MdDelete onClick={() => handleTaskDelete(task.id)} />
            </ul>)}
            {taskForm && <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={taskInput} />
                <button>Add</button>
            </form>}

            <button
                onClick={() => {
                    handleTaskForm()
                }}
            >
                Add task
            </button>
        </div>
    );
};
export default Card;
