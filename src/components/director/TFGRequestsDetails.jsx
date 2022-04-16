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

const TFGRequestsDetails = ({ prettyTfgs }) => {
  const [repliedToRequest, setRepliedToRequest] = useState(false);
  const [replyToRequestError, setReplyToRequestError] = useState(false);

  return (
    <div>
      {!repliedToRequest ? (
        <div>
          <Typography variant="subtitle1" component="div">
            Aquí podrás encontrar las solicitudes de TFG pendientes de revisar
            👇🏾
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
                {prettyTfgs.map((row) => (
                  <StyledTableRow
                    key={row.title}
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
        </div>
      ) : (
        <div>
          {replyToRequestError ? (
            <div>pos hubo un error</div>
          ) : (
            <div>la reply se ha guardado OK</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TFGRequestsDetails;
