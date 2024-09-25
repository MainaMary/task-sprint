
import { useKanbanBoard } from '../context/appContext'
import { Typography, Box } from '@mui/material'

//This component checks the number of columns in the Kanban board and displays a warning message if the number of columns exceeds the set limit(5 columns).
const Limit = () => {
    const { columns } = useKanbanBoard()
    return (
        <Box style={{ margin: "8px 0", textAlign: "start" }}>
            {columns.length > 4 && <Typography style={{ color: "red" }}>Only 5 columns are allowed</Typography>}
        </Box>
    )
}

export default Limit