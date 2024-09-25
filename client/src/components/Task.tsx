import { Box, Paper, Typography } from '@mui/material'
import { useKanbanBoard } from '../context/appContext'
import { MdDelete } from 'react-icons/md'
import { useSortable } from '@dnd-kit/sortable'

interface TaskType {
    task: {
        id: string,
        task: string
    }
}
const Task = ({ task }: TaskType) => {
    const { handleTaskDelete } = useKanbanBoard();
    const { transition, setNodeRef, attributes, transform, listeners } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
        }
    })
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    }
    return (
        <Box
            ref={setNodeRef}
            key={task.id}
            style={style}
            {...attributes}
            {...listeners}
            sx={{
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                textAlign: "left",
                padding: "16px 8px"
            }}
        >
            <Paper elevation={6} sx={{ padding: "6px" }}>
                <Typography>{task.task}</Typography>
                <MdDelete onClick={() => handleTaskDelete(task.id)} />
            </Paper>
        </Box>
    )
}

export default Task