import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const TFGDetails = ({ student, tfgs }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "deeppink",
      color: theme.palette.common.white,
      fontWeight: "bolder",
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h6" component="h6">
          Bienvenida {student.name} 📚
        </Typography>
        <Typography variant="subtitle2" component="div">
          Te mostramos la lista de tus solicitudes de TFG 👇🏾
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Título del TFG</StyledTableCell>
                <StyledTableCell align="right">Directora</StyledTableCell>
                <StyledTableCell align="right">Estado</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {tfgs.map((row) => (
                <StyledTableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.directorId}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};
export default TFGDetails;
