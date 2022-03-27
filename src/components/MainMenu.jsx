import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { checkCredentials } from "../services/TFGApi";
import { useState } from "react";

const MainMenu = () => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const checkCrentials = (inputUser, inputPassword) => {
    checkCredentials(user, password).then((response) => {
      if (response.status === 200) {
        console.log(`La usuaria es ${user} y su contraseña es ${password}`);
      }
    }).catch(e => {
        console.log("No se encuenta la usuaria")
    });
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs>
        <Stack spacing={2}>
          <div>TFGs</div>
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

export default MainMenu;
