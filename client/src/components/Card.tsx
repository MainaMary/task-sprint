import { ColumnType } from "../types"
const Card = ({ item }: { item: ColumnType }) => {
    return (
        <div >
            <p>{item.id}</p>
            <p>{item.title}</p>
        </div>
    )
}
export default Card