import { Box, Paper, Typography } from '@mui/material'
import { useKanbanBoard } from '../context/appContext'
import { MdDelete } from 'react-icons/md'
import { useSortable } from '@dnd-kit/sortable'
import { SingleTaskType } from '../types'

const Task = ({ task }: SingleTaskType) => {
    const { handleTaskDelete } = useKanbanBoard();
    const { transition, setNodeRef, attributes, transform, listeners, isDragging } = useSortable({
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
    if (isDragging) {
        return <Paper elevation={6}>Drag</Paper>
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