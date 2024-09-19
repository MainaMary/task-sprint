import { useState, useMemo } from "react";
import { ColumnType, Tasktype } from "../types";
import { generateUniqueId } from "../utils";
import { DndContext } from "@dnd-kit/core";
import Card from "./Card";
import { useKanbanBoard } from "../context/appContext";
import { SortableContext } from "@dnd-kit/sortable";

const KanbanBoard = () => {
    const { allTasks, taskInput, setTaskInput, columns, columnName, setColumnName, isColumnFormOpen, setIsColumnFormOpen, createTask, addColumn } = useKanbanBoard()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value);
    };
    const columnIds: any = useMemo(() => {
        columns?.map((col) => col.id);
    }, []);
    const showForm = () => {
        setIsColumnFormOpen(true)
    };

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
            {isColumnFormOpen && <form onSubmit={addColumn}>
                <input type="text" onChange={handleChange} value={columnName} />
                <button>Add</button>
            </form>}
            <button onClick={showForm}>Add column</button>
        </div>
    );
};

export default KanbanBoard;
