import * as React from "react";
import Stack from "@mui/material/Stack";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createTfgRequest } from "../../services/TFGApi";

const TFGRequestForm = ({ student, availableDirectors }) => {
  const [title, setTitle] = useState();
  const [selectedDirector, setSelectedDirector] = useState();
  const [tfgRequested, setTfgRequested] = useState(false);
  const [tfgRequestError, setTfgRequestError] = useState(false);

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h6" component="h6">
          Bienvenida {student.name} 📚
        </Typography>
        <Typography variant="subtitle1" component="div">
          Rellena el siguiente formulario para completar tu solicitud de TFG 👇🏾
        </Typography>
        {!tfgRequested && (
          <TextField
            label="Introduce el título para tu TFG...  📑"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
        {availableDirectors && !tfgRequested && (
          <FormControl fullWidth>
            <InputLabel>Directora 👩‍💼</InputLabel>
            <Select
              label="Directora 👩‍💼"
              onChange={(e) => setSelectedDirector(e.target.value)}
              value={selectedDirector ?? ""}
            >
              {availableDirectors.map((row, index) => (
                <MenuItem key={index} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {!tfgRequested && (
          <Button
            onClick={() => {
              createTfgRequest({
                title: title,
                studentId: student.id,
                directorId: selectedDirector,
              })
                .then((response) => {
                  if (response.status === 201) {
                    setTfgRequested(true);
                  }
                })
                .catch(() => setTfgRequestError(true));
            }}
            variant="contained"
          >
            Solicitar TFG 📝 con los datos introducidos
          </Button>
        )}
        {tfgRequested && (
          <Typography variant="subtitle1" component="div">
            Su TFG se ha solicitado correctamente 🙌
          </Typography>
        )}
        {tfgRequestError && (
          <Typography variant="subtitle1" component="div">
            Ha habido algún problema al solicitar su TFG 😭
          </Typography>
        )}
      </Stack>
    </Container>
  );
};
export default TFGRequestForm;
