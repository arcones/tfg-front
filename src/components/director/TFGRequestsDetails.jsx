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

const TFGRequestsDetails = ({ prettyTfgs }) => {
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TFGRequestsDetails;
