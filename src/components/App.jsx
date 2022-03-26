import { useEffect, useState } from "react";

import { getAllTfgs } from "../services/TFGApi";

const App = () => {
  const [tfgs, setTfgs] = useState([]);

  useEffect(() => {
    getAllTfgs().then((response) => {
      if (response.status === 200) {
        setTfgs(response.data)
      }
    });
  }, []);

  console.log(tfgs)

  return (
    <div>
      <h1>Hola mundo!!!</h1>
      {tfgs.map(({id, title}) => (
          <p key={id}>TFG {id} con titulo {title}</p>   
        ))
      }
    </div>
  );
};

export default App;
