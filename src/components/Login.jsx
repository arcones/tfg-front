import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { checkCredentials } from "../services/TFGApi";
import { useState } from "react";

const Login = ({ setLoggedUser }) => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [wrongPassword, setWrongPassword] = useState(false);

  const searchUser = () => {
    checkCredentials(user, password)
      .then((response) => {
        setLoggedUser(response.data);
      })
      .catch(() => {
        setWrongPassword(true);
      });
  };

  return (
    <Grid container>
      <Grid item xs />
      <Grid item xs>
        <Stack spacing={2}>
          <div>TFGs</div>
          {wrongPassword && (
            <Alert severity="error">Las credenciales son incorrectas</Alert>
          )}
          <TextField
            label="Usuaria"
            variant="outlined"
            onChange={(event) => {
              setUser(event.target.value);
            }}
            onFocus={() => setWrongPassword(false)}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => setWrongPassword(false)}
          />
          <Button
            onClick={() => {
              searchUser();
            }}
            variant="contained"
          >
            Login
          </Button>
        </Stack>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Login;
