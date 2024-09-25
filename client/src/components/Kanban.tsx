import { useMemo } from "react";
import { DndContext, DragStartEvent, PointerSensor, useSensors, useSensor } from "@dnd-kit/core";
import Card from "./Card";
import { useKanbanBoard } from "../context/appContext";
import { SortableContext } from "@dnd-kit/sortable";
import { Paper, Typography, Box, Grid, Button } from "@mui/material";
import TextFieldInput from "./TextFieldInput";
//import Unstable_Grid2 from '@mui/material/Unstable_Grid2';

const KanbanBoard = () => {
    //access context values and functions from the context custom hook
    const { allTasks, taskInput, setTaskInput, columns, columnName, setColumnName, isColumnFormOpen, setIsColumnFormOpen, createTask, addColumn, } = useKanbanBoard()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value);
    };
    const columnIds: (string | number)[] = useMemo(() => {
        // Define the fallback toan  empty array if columns is undefined
        return columns?.map((col) => col.id) || [];
    }, [columns]);
    const showForm = () => {
        setIsColumnFormOpen(prev => !prev)
    };
    //seperate the drag clicks from the normal clicks
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 30, // Activate dragging after moving 300px
            },
        })
    );
    //handle drag and drop on the DOM
    const handleDragDrop = (event: DragStartEvent) => {
        console.log(event)
    }
    return (
        <Box style={{ display: "flex", gap: 12 }}>
            <DndContext onDragStart={handleDragDrop} sensors={sensors} >
                <Grid container spacing={3} style={{ width: "100%" }}>
                    <SortableContext items={columnIds}>
                        {columns?.length > 0 && (
                            columns?.map((item) => (
                                <Grid item style={{ width: "250px" }}>
                                    <Card key={item.id} item={item} addTask={createTask} taskInput={taskInput} setTaskInput={setTaskInput}
                                        tasks={allTasks.filter(task => task.columnId === item.id)}
                                    />
                                </Grid>
                            ))
                        )}
                    </SortableContext>
                </Grid>
            </DndContext>
            {isColumnFormOpen &&
                <Paper elevation={2} style={{ height: "120px", padding: "8px" }} >
                    <form onSubmit={addColumn}>
                        <TextFieldInput label="Name" onChange={handleChange} value={columnName} />
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography onClick={showForm}>Cancel</Typography>
                            <button>Add</button>
                        </Box>
                    </form>
                </Paper>
            }
            {!isColumnFormOpen && columns?.length <= 4 && <Paper style={{ height: "40px" }} elevation={2}>
                <Button style={{ width: "250px" }} onClick={showForm}>Add column</Button></Paper>}

        </Box>
    );
};

export default KanbanBoard;
