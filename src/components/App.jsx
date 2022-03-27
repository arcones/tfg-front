import Login from "./Login";
import StudentHome from "./student/StudentHome"
import { useState } from "react";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState();
  
  return <>{isLogged ? <StudentHome student={student}/> : <Login setIsLogged={setIsLogged} setStudent={setStudent}/>}</>;
};
export default App;
