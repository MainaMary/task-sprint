import { useState } from "react";;
import { ColumnType, Tasktype } from "../types";
import { useKanbanBoard } from "../context/appContext";
import { MdDelete } from "react-icons/md";
import { Paper, Typography, Box, Grid } from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import { IoIosClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
interface Props {
    item: ColumnType;
    addTask: (id: string | number) => void;
    taskInput: string;
    setTaskInput: React.Dispatch<React.SetStateAction<string>>;
    tasks: Tasktype[];
}
const Card = ({ item, addTask, taskInput, setTaskInput, tasks }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskForm, setTaskForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newColumnName, setColumnName] = useState("");
    const {
        handleTaskDelete,
        handleColumnDelete,
        clearColumn,
        handleEditColumn,
    } = useKanbanBoard();
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
        <Paper elevation={2} style={{ position: "relative", paddingBottom: "8px" }}>
            <Box style={{ display: "flex", height: "auto", alignItems: "center", width: "250px,", padding: "8px", justifyContent: "space-between" }}>
                {isEditing && (
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            onChange={handleColumnChange}
                            value={newColumnName}
                        />
                        <Box style={{ display: "flex", justifyContent: "space-around", marginTop: "10px", height: "auto", alignItems: "center" }}>
                            <Typography onClick={openEdit}>Cancel</Typography>
                            <button style={{ backgroundColor: "#1A76D2" }}>Edit</button>
                        </Box>
                    </form>
                )}
                {!isEditing && <Box style={{ display: "flex", height: "auto", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Typography> {item.title} </Typography>
                    <div><BsThreeDots style={{ cursor: "pointer", textAlign: "left" }} onClick={handleOpen} /></div>
                </Box>}
            </Box>
            <Box style={{ position: "absolute", top: "10px", right: "-16px" }}>
                {isOpen && (
                    <Paper elevation={2} style={{ padding: "12px", textAlign: "start", cursor: "pointer" }}>
                        <IoIosClose onClick={handleOpen} />
                        <Typography onClick={() => clearColumn(item.id)} style={{ margin: "4px" }}>Clear</Typography>
                        <Typography onClick={openEdit} style={{ margin: "4px" }}>Update</Typography>
                        <Typography style={{ margin: "4px" }} onClick={() => handleColumnDelete(item.id)}>Delete</Typography>
                    </Paper>
                )}
            </Box>
            {tasks?.length > 0 &&
                tasks?.map((task) => (
                    <Box
                        key={task.id}
                        sx={{
                            borderTop: "1px solid gray",
                            borderBottom: "1px solid gray",
                            textAlign: "left",
                            padding: "16px 8px"
                        }}
                    >
                        <Paper elevation={6} style={{ padding: "6px" }}>
                            <Typography>{task.task}</Typography>
                            <MdDelete onClick={() => handleTaskDelete(task.id)} />
                        </Paper>
                    </Box>
                ))}
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
