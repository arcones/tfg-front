import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { checkCredentials } from "../services/TFGApi";
import { useState } from "react";

const Login = ({ setIsLogged, setStudent }) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [wrongPassword, setWrongPassword] = useState(false);

  const checkCrentials = () => {
    checkCredentials(user, password)
      .then((response) => {
        if (response.status === 200) {
          setStudent(response.data);
          setIsLogged(true);
        }
      })
      .catch((e) => {
        console.error("No se encuenta la usuaria");
        setWrongPassword(true);
      });
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs>
        <Stack spacing={2}>
          <div>TFGs</div>
          {wrongPassword && (
            <Alert severity="error">Las credenciales son incorrectas</Alert>
          )}
          <TextField
            label="Usuaria"
            variant="outlined"
            onChange={(event) => setUser(event.target.value)}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            onClick={() => {
              checkCrentials();
            }}
            variant="contained"
          >
            Login
          </Button>
        </Stack>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default Login;
