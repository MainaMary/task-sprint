import { useState } from "react"
import { ColumnType } from "../types"
import { generateUniqueId } from "../utils"
import Card from "./Card"
const KanbanBorad = () => {
    const [columns, setColumns] = useState<ColumnType[]>([])
    console.log({ columns })
    const addColumn = () => {
        const column = {
            id: generateUniqueId(),
            title: 'Column'
        }
        setColumns([...columns, column])
    }
    return (
        <div className="flex">
            <div className="flex gap-4">
                {columns.length > 0 && columns.map(item =>
                    <Card key={item.id} item={item} />
                )}
            </div>
            <button onClick={addColumn}>Add column</button>
        </div>
    )
}

export default KanbanBorad