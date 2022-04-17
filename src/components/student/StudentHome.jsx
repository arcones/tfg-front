import { useEffect, useState } from "react";

import TFGRequestsDetails from "./TFGRequestsDetails";
import TFGRequestForm from "./TFGRequestForm";
import {
  getDirectorsList,
  getTfgsByStudentId,
  getUserInfo,
} from "../../services/TFGApi";

const StudentHome = ({ student }) => {
  const [tfgs, setTfgs] = useState([]);
  const [prettyTfgs, setPrettyTfgs] = useState([]);
  const [newTfgRequest, setNewTfgRequest] = useState(false);
  const [availableDirectors, setAvailableDirectors] = useState(false);

  useEffect(() => {
    getTfgsByStudentId(student.id).then((response) => setTfgs(response.data));
    getDirectorsList().then((response) => setAvailableDirectors(response.data));
  }, [student]);

  function transformTFGStatusInSentence(status) {
    switch (status) {
      case "INIT_REQUESTED":
        return "Solicitud de realización de TFG iniciada  🔛";
      case "INIT_REJECTED":
        return "Solicitud de realización de TFG rechazada  ⛔";
      case "INIT_APPROVED":
        return "Solicitud de realización de TFG aprobada  ✅";
      case "READ_REQUESTED":
        return "Solicitud de lectura y defensa de TFG iniciada  🔛";
      case "READ_REJECTED":
        return "Solicitud de lectura y defensa de TFG rechazada  ⛔";
      case "READ_APPROVED":
        return "Solicitud de lectura y defensa de TFG aprobada  ✅";
    }
  }

  async function prettifyTfgs(tfgs) {
    let prettifiedTfgs = [];
    for (const tfg of tfgs) {
      const directorInfo = await getUserInfo(tfg.directorId).then(
        (response) => response.data
      );
      prettifiedTfgs.push({
        id: tfg.id,
        title: tfg.title,
        directorName: directorInfo.name,
        status: transformTFGStatusInSentence(tfg.status),
      });
    }
    setPrettyTfgs(prettifiedTfgs);
  }

  useEffect(() => {
    prettifyTfgs(tfgs);
  }, [tfgs]);

  return (
    <>
      {prettyTfgs.length > 0 && !newTfgRequest ? (
        <TFGRequestsDetails
          prettifiedTfgs={prettyTfgs}
          student={student}
          setNewTfgRequest={setNewTfgRequest}
        />
      ) : (
        <TFGRequestForm
          availableDirectors={availableDirectors}
          student={student}
        />
      )}
    </>
  );
};
export default StudentHome;
