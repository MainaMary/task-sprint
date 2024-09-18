import { useState, useMemo } from "react";
import { ColumnType, Tasktype } from "../types";
import { generateUniqueId } from "../utils";
import { DndContext } from "@dnd-kit/core";
import Card from "./Card";
import { SortableContext } from "@dnd-kit/sortable";

const KanbanBorad = () => {
    const [columns, setColumns] = useState<ColumnType[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [allTasks, setAllTasks] = useState<Tasktype[]>([])
    const [taskInput, setTaskInput] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const columnIds: any = useMemo(() => {
        columns?.map((col) => col.id);
    }, []);
    const showForm = () => {

        setIsFormOpen(true)

    };
    const addColumn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const column = {
            id: generateUniqueId(),
            title: inputValue,
        };
        setColumns([...columns, column]);
        setInputValue('')
        setIsFormOpen(false)
    }
    const createTask = (columnId: string | number) => {
        const newTask = {
            id: generateUniqueId(),
            task: taskInput,
            columnId
        }
        setAllTasks([...allTasks, newTask])
    }
    console.log(allTasks)
    return (
        <div className="flex">
            <DndContext>
                <div className="flex gap-4">
                    {columns?.length > 0 && (
                        columns?.map((item) => (
                            <Card key={item.id} item={item} addTask={createTask} taskInput={taskInput} setTaskInput={setTaskInput}
                                tasks={allTasks.filter(task => task.columnId === item.id)}
                            />
                        ))
                    )}
                </div>
            </DndContext>
            {isFormOpen && <form onSubmit={addColumn}>
                <input type="text" onChange={handleChange} value={inputValue} />
                <button>Add</button>
            </form>}
            <button onClick={showForm}>Add column</button>
        </div>
    );
};

export default KanbanBorad;
