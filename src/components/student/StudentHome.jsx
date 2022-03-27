import { useEffect, useState } from "react";

import TFGDetails from "./TFGDetails"
import TFGRequestForm from "./TFGRequestForm"
import { getTfgsByStudentId } from "../../services/TFGApi";

const StudentHome = ({ student }) => {
  const [tfgs, setTfgs] = useState([]);

  useEffect(() => {
    getTfgsByStudentId(student.id).then((response) => {
        if (response.status === 200) {
          setTfgs(response.data);
        }
      });
  }, [student]);

  return (
    <>{tfgs.length > 0 ? <TFGDetails tfgs={tfgs} student={student}/> : <TFGRequestForm />}</>
  );
};
export default StudentHome;
