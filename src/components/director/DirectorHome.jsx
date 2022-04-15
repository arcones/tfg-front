import Typography from "@mui/material/Typography";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import {
  getDirectorsList,
  getTfgsByDirectorId,
  getTfgsByStudentId,
  getUserInfo,
} from "../../services/TFGApi";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const DirectorHome = ({ director }) => {
  const [tfgs, setTfgs] = useState();
  const [prettyTfgs, setPrettyTfgs] = useState([]);

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

  function transformTFGStatusInSentence(status) {
    console.log("transformTFGStatusInSentence");
    switch (status) {
      case "INIT_REQUESTED":
        return "Solicitud pendiente de revisar ❓";
      case "INIT_REJECTED":
        return "Solicitud de realización de TFG rechazada  ⛔";
      case "INIT_APPROVED":
        return "Realización de TFG en curso ✅";
      case "READ_REQUESTED":
        return "Solicitud de lectura y defensa pendiente de revisar ❓";
      case "READ_REJECTED":
        return "Solicitud de lectura y defensa de TFG rechazada  ⛔";
      case "READ_APPROVED":
        return "Realización de lectura y defensa de TFG en curso  ✅";
    }
  }

  async function prettifyTfgs(tfgs) {
    console.log("prettifyTfgs");
    let prettifiedTfgs = [];
    for (const tfg of tfgs) {
      const studentInfo = await getUserInfo(tfg.studentId).then(
        (response) => response.data
      );
      prettifiedTfgs.push({
        title: tfg.title,
        studentName: studentInfo.name,
        status: transformTFGStatusInSentence(tfg.status),
      });
    }
    setPrettyTfgs(prettifiedTfgs);
  }

  useEffect(() => {
    console.log("useEffect_getTfgsByDirectorId");
    getTfgsByDirectorId(director.id).then((response) => setTfgs(response.data));
  }, [director]);

  useEffect(() => {
    console.log("useEffect_prettifyTfgs");
    prettifyTfgs(tfgs);
  }, [tfgs]);

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h6">
        Bienvenida {director.name} 📚
      </Typography>
      {prettyTfgs.length > 0 && (
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
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>
                      {transformTFGStatusInSentence(row.status)}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Stack>
  );
};

export default DirectorHome;
