import { useMemo, useState } from "react";
import { DndContext, DragStartEvent, PointerSensor, useSensors, useSensor, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import Card from "./Card";
import { useKanbanBoard } from "../context/appContext";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Paper, Typography, Box, Grid, Button } from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import { ColumnType } from "../types";
import { createPortal } from "react-dom";
//import Unstable_Grid2 from '@mui/material/Unstable_Grid2';

const KanbanBoard = () => {
    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null)

    //access context values and functions from the context custom hook
    const { allTasks, columns, setColumns, columnName, setColumnName, isColumnFormOpen, setIsColumnFormOpen, addColumn, } = useKanbanBoard()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value);
    };
    const columnIds: (string | number)[] = useMemo(() => {
        // Define the fallback to an  empty array if columns array is undefined
        return columns?.map((col) => col.id) || [];
    }, [columns]);
    const showForm = () => {
        setIsColumnFormOpen(prev => !prev)
    };
    //seperate the drag clicks from the normal clicks
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 30, // Activate dragging after moving 30px
            },
        })
    );
    //handle drag and drop on the DOM
    const handleDragDrop = (event: DragStartEvent) => {
        console.log(event)
        if (event?.active.data.current?.type === "Column") {
            setActiveColumn(event?.active.data.current.column)
            return
        }
    }

    //handle drag end on the DOM
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return
        const activeColumnArr = columns.findIndex(column => column.id === active.id)
        const overColumnArr = columns.findIndex(column => column.id === over.id)

        //swap the active column index with over column index
        setColumns(arrayMove(columns, activeColumnArr, overColumnArr))

    }
    return (
        <Box style={{ display: "flex", gap: 12 }}>
            <DndContext onDragStart={handleDragDrop} sensors={sensors} onDragEnd={handleDragEnd}>
                <Grid container spacing={3} style={{ width: "100%" }}>
                    <SortableContext items={columnIds}>
                        {columns?.length > 0 && (
                            columns?.map((item) => (
                                <Grid item style={{ width: "250px" }}>
                                    <Card key={item.id} item={item}
                                        tasks={allTasks.filter(task => task.columnId === item.id)}
                                    />
                                </Grid>
                            ))
                        )}
                    </SortableContext>
                </Grid>
                {createPortal(<DragOverlay>
                    {activeColumn && <Card activeColumn={activeColumn} tasks={[{ columnId: '123', id: '123', task: 'test' }]} />}
                </DragOverlay>, document.body)}

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
            {!isColumnFormOpen && columns?.length <= 4 && <Paper style={{ height: "40px", textAlign: "start" }} elevation={2}>
                <Button style={{ width: "250px", textAlign: "start" }} onClick={showForm}>Add column</Button></Paper>}

        </Box>
    );
};

export default KanbanBoard;
