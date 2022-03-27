import Login from "./Login";
import StudentHome from "./student/StudentHome"
import {useState} from "react";
import DirectorHome from "./director/DirectorHome";

const App = () => {
    const [loggedUser, setLoggedUser] = useState();

    switch (loggedUser?.role) {
        case 'Director':
            return <DirectorHome director={loggedUser}/>
        case 'Student':
            return <StudentHome student={loggedUser}/>
        default:
            return <Login setLoggedUser={setLoggedUser}/>
    }
}

export default App;