import { useMemo, useState } from "react";;
import { useKanbanBoard } from "../context/appContext";
import { Paper, Typography, Box } from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import { IoIosClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import Task from "./Task";
import { CardType } from "../types";

const Card = ({ item, addTask, taskInput, setTaskInput, tasks }: CardType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskForm, setTaskForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newColumnName, setColumnName] = useState("");
    const {
        handleColumnDelete,
        clearColumn,
        handleEditColumn,
    } = useKanbanBoard();

    const { transition, setNodeRef, attributes, transform, listeners } = useSortable({
        id: item.id,
        data: {
            type: "Column",
            item
        }
    })

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    }
    const taskIds = useMemo(() => {
        return tasks?.map(task => task.id)
    }, [tasks])
    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };
    const handleTaskForm = () => {
        setTaskForm(prev => !prev);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(event.target.value);
    };
    const openEdit = () => {
        setIsEditing((prev) => !prev);
    };
    const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTask(item.id);
        setTaskForm(false);
        setTaskInput("");
    };
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newColumn = {
            id: item.id,
            title: newColumnName,
        };
        handleEditColumn(newColumn);
        setIsEditing(false);
        setIsOpen(false);
    };
    return (
        <Paper ref={setNodeRef} elevation={2} style={{ position: "relative", paddingBottom: "8px", ...style }} {...attributes} {...listeners}>
            <Box sx={{ display: "flex", height: "auto", alignItems: "center", width: "250px,", padding: "8px", justifyContent: "space-between" }}>
                {isEditing && (
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            onChange={handleColumnChange}
                            value={newColumnName}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "10px", height: "auto", alignItems: "center" }}>
                            <Typography onClick={openEdit}>Cancel</Typography>
                            <button style={{ backgroundColor: "#1A76D2" }}>Edit</button>
                        </Box>
                    </form>
                )}
                {!isEditing && <Box sx={{ display: "flex", height: "auto", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Typography> {item.title} </Typography>
                    <div><BsThreeDots style={{ cursor: "pointer", textAlign: "left" }} onClick={handleOpen} /></div>
                </Box>}
            </Box>
            <Box style={{ position: "absolute", top: "10px", right: "-16px" }}>
                {isOpen && (
                    <Paper elevation={2} sx={{ padding: "12px", textAlign: "start", cursor: "pointer" }}>
                        <IoIosClose onClick={handleOpen} />
                        <Typography onClick={() => clearColumn(item.id)} style={{ margin: "4px" }}>Clear</Typography>
                        <Typography onClick={openEdit} style={{ margin: "4px" }}>Update</Typography>
                        <Typography style={{ margin: "4px" }} onClick={() => handleColumnDelete(item.id)}>Delete</Typography>
                    </Paper>
                )}
            </Box>
            <SortableContext items={taskIds}>
                {tasks?.length > 0 &&
                    tasks?.map((task) => (
                        <Task key={task.id} task={task} />

                    ))}
            </SortableContext>

            {taskForm && (
                <form onSubmit={handleSubmit}>
                    <TextFieldInput
                        label="Name"
                        onChange={handleChange}
                        value={taskInput}
                    />
                    <Box style={{ display: "flex", justifyContent: "space-around", marginTop: "10px", height: "auto", alignItems: "center" }}>
                        <Typography onClick={handleTaskForm}>Cancel</Typography>
                        <button style={{ backgroundColor: "#1A76D2" }}>Add</button>
                    </Box>

                </form>
            )}
            {!taskForm && <Typography
                style={{ cursor: "pointer", margin: "12px 0" }}
                onClick={() => {
                    handleTaskForm();
                }}
            >
                Add card
            </Typography>}

        </Paper>
    );
};
export default Card;
