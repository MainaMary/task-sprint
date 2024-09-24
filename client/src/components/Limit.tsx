
import { useKanbanBoard } from '../context/appContext'
import { Typography, Box } from '@mui/material'
const Limit = () => {
    const { columns } = useKanbanBoard()
    return (
        <Box style={{ margin: "8px 0", textAlign: "start" }}>
            {columns.length > 4 && <Typography style={{ color: "red" }}>Only 5 columns are allowed</Typography>}
        </Box>

    )
}

export default Limit