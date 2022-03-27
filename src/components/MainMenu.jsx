import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const MainMenu = () => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const saveCredentials = (inputUser, inputPassword) => {
    setUser(inputUser);
    setPassword(inputPassword);
    console.log(`La usuaria es ${user} y su contraseña es ${password}`);
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs>
        <Stack spacing={2}>
          <div>TFGs</div>
          <TextField label="Usuaria" variant="outlined" />
          <TextField label="Contraseña" variant="outlined" />
          <Button
            onClick={() => {
              saveCredentials();
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
