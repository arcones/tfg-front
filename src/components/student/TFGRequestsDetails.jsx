import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container, Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { StyledTableCell } from "../common/StyledTableCell";
import { StyledTableRow } from "../common/StyledTableRow";
import { requestTfgRead } from "../../services/TFGApi";

const TFGRequestsDetails = ({ student, prettifiedTfgs, setNewTfgRequest }) => {
  const [tableTfgs, setTableTfgs] = useState(prettifiedTfgs);
  const [requestedTfgRead, setRequestedTfgRead] = useState(false);
  const [requestedReadError, setRequestedReadError] = useState(false);

  function allTfgsRejected() {
    return prettifiedTfgs.every(
      (tfg) => tfg.status === "Solicitud de realización de TFG rechazada  ⛔"
    );
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h6" component="h6">
          Bienvenida {student.name} 📚
        </Typography>
        <Typography variant="subtitle1" component="div">
          Te mostramos la lista de tus solicitudes de TFG 👇🏾
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Título del TFG 📑</StyledTableCell>
                <StyledTableCell>Directora 👩‍💼</StyledTableCell>
                <StyledTableCell>Estado 🌀</StyledTableCell>
                <StyledTableCell>Acción ✍🏻</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {tableTfgs.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.directorName}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {row.status ===
                    "Solicitud de realización de TFG aprobada  ✅" ? (
                      <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                          requestTfgRead(row.id)
                            .then((response) => {
                              if (response.status === 201) {
                                setRequestedTfgRead(true);
                                setTableTfgs(
                                  tableTfgs.map((tfg) =>
                                    tfg.id === row.id
                                      ? {
                                          ...tfg,
                                          status:
                                            "Solicitud de lectura y defensa de TFG iniciada  🔛",
                                        }
                                      : tfg
                                  )
                                );
                              }
                            })
                            .catch(() => setRequestedReadError(true));
                        }}
                      >
                        Solicitar lectura y defensa
                      </Button>
                    ) : (
                      <Typography>No hay acciones pendientes 🍹</Typography>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {allTfgsRejected() && (
          <Button
            onClick={() => {
              setNewTfgRequest(true);
            }}
            variant="contained"
          >
            Solicitar nuevo TFG 📝
          </Button>
        )}
        {requestedTfgRead && requestedReadError && (
          <Snackbar
            open={requestedReadError}
            autoHideDuration={3000}
            onClose={() => setRequestedReadError(false)}
            message="Hubo un error al actualizar el estado del TFG"
          />
        )}
        {requestedTfgRead && !requestedReadError && (
          <Snackbar
            open={requestedTfgRead}
            autoHideDuration={3000}
            onClose={() => setRequestedTfgRead(false)}
            message="El estado del TFG se ha actualizado correctamente"
          />
        )}
      </Stack>
    </Container>
  );
};
export default TFGRequestsDetails;
