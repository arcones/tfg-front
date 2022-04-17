import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { StyledTableRow } from "../common/StyledTableRow";
import { StyledTableCell } from "../common/StyledTableCell";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { acceptTfgRequest, rejectTfgRequest } from "../../services/TFGApi";
import Grid from "@mui/material/Grid";
import { Snackbar } from "@mui/material";

const TFGRequestsDetails = ({ prettyTfgs }) => {
  const [tableTfgs, setTableTfgs] = useState(prettyTfgs);
  const [repliedToRequest, setRepliedToRequest] = useState(false);
  const [replyToRequestError, setReplyToRequestError] = useState(false);

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Aquí podrás encontrar las solicitudes de TFG pendientes de revisar 👇🏾
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Título del TFG 📑</StyledTableCell>
              <StyledTableCell>Estudiante 👩‍🎓</StyledTableCell>
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
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {row.status === "Solicitud pendiente de revisar ❓" ? (
                    <Grid container spacing={2}>
                      <Grid item>
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => {
                            acceptTfgRequest(row.id)
                              .then((response) => {
                                if (response.status === 202) {
                                  setRepliedToRequest(true);
                                  setTableTfgs(
                                    tableTfgs.map((tfg) =>
                                      tfg.id === row.id
                                        ? {
                                            ...tfg,
                                            status:
                                              "Realización de TFG en curso ✅",
                                          }
                                        : tfg
                                    )
                                  );
                                }
                              })
                              .catch(() => setReplyToRequestError(true));
                          }}
                        >
                          Aceptar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            rejectTfgRequest(row.id)
                              .then((response) => {
                                if (response.status === 202) {
                                  setRepliedToRequest(true);
                                  setTableTfgs(
                                    tableTfgs.map((tfg) =>
                                      tfg.id === row.id
                                        ? {
                                            ...tfg,
                                            status:
                                              "Solicitud de realización de TFG rechazada  ⛔",
                                          }
                                        : tfg
                                    )
                                  );
                                }
                              })
                              .catch(() => setReplyToRequestError(true));
                          }}
                        >
                          Rechazar
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography>No hay acciones pendientes 🍹</Typography>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {repliedToRequest && replyToRequestError && (
        <Snackbar
          open={replyToRequestError}
          autoHideDuration={3000}
          onClose={() => setReplyToRequestError(false)}
          message="Hubo un error al actualizar el estado del TFG"
        />
      )}
      {repliedToRequest && !replyToRequestError && (
        <Snackbar
          open={repliedToRequest}
          autoHideDuration={3000}
          onClose={() => setRepliedToRequest(false)}
          message="El estado del TFG se ha actualizado correctamente"
        />
      )}
    </div>
  );
};

export default TFGRequestsDetails;
