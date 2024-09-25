import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material";
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