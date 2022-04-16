import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { getTfgsByDirectorId, getUserInfo } from "../../services/TFGApi";
import { Container } from "@mui/material";
import TFGRequestsDetails from "./TFGRequestsDetails";

const DirectorHome = ({ director }) => {
  const [tfgs, setTfgs] = useState([]);
  const [prettyTfgs, setPrettyTfgs] = useState([]);

  function transformTFGStatusInSentence(status) {
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
    let prettifiedTfgs = [];
    for (const tfg of tfgs) {
      const studentInfo = await getUserInfo(tfg.studentId).then(
        (response) => response.data
      );
      prettifiedTfgs.push({
        id: tfg.id,
        title: tfg.title,
        studentName: studentInfo.name,
        status: transformTFGStatusInSentence(tfg.status),
      });
    }
    setPrettyTfgs(prettifiedTfgs);
  }

  useEffect(() => {
    getTfgsByDirectorId(director.id).then((response) => {
      setTfgs(response.data);
    });
  }, [director]);

  useEffect(() => {
    prettifyTfgs(tfgs);
  }, [tfgs]);

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h6" component="h6">
          Bienvenida {director.name} 📚
        </Typography>
        {prettyTfgs.length > 0 && (
          <TFGRequestsDetails prettyTfgs={prettyTfgs} />
        )}
      </Stack>
    </Container>
  );
};

export default DirectorHome;
