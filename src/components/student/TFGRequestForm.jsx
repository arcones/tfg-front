import * as React from "react";
import Stack from "@mui/material/Stack";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";

const TFGRequestForm = ({ student, availableDirectors }) => {
  //const [selectedDirector, setSelectedDirector] = useState();

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h6">
        Bienvenida {student.name} 📚
      </Typography>
      <Typography variant="subtitle1" component="div">
        Rellena el siguiente formulario para completar tu solicitud de TFG 👇🏾
      </Typography>
      <TextField
        label="Introduce el título para tu TFG...  📑"
        variant="standard"
      />
      {availableDirectors && (
        <FormControl fullWidth>
          <InputLabel>Directora 👩‍💼</InputLabel>
          <Select
            label="Directora 👩‍💼"
            onChange={(e) => console.log(e.target.value)}
          >
            {availableDirectors.map((row) => (
              <MenuItem value={row.id}>{row.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  );
};
export default TFGRequestForm;
