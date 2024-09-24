import { TextField } from "@mui/material";
interface TextFieldProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label: string;
    value: string

}
const TextFieldInput = ({ onChange, label, value }: TextFieldProps) => {
    return (
        <TextField
            id="outlined-controlled"
            label={label}
            value={value}
            onChange={onChange}
            focused
            required
            style={{ padding: "8px" }}
        />
    )
}

export default TextFieldInput