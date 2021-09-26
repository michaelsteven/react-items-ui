import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import HamburgerMenu from "./HamburgerMenu";
import ProfileMenu from "./ProfileMenu";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <HamburgerMenu/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Demo Application
          </Typography>
          {auth && (
              <ProfileMenu/>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}