import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, Collapse } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0); // 0 = Sign In, 1 = Sign Up
  const [open, setOpen] = React.useState(false);
  const {handleRegister,handleLogin}=React.useContext(AuthContext)
  let handleAuth=async ()=>{
    try{
      if(formState===0){
        let result=handleLogin(username,password);
        


      }
      if(formState===1){
        let result=await handleRegister(name,username,password);
        console.log(result);
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");


      }

    }catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";
      setError(message);
    }
    
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Left background image (desktop only) */}
        <Grid
          item
          xs={0}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('frontend/public/background.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
          

          }}
        />

        {/* Right form panel */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {formState === 0 ? 'Sign In' : 'Sign Up'}
            </Typography>

            {/* Toggle buttons */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant={formState === 0 ? 'contained' : 'outlined'}
                onClick={() => setFormState(0)}
                sx={{ mr: 1 }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? 'contained' : 'outlined'}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form */}
            <Box component="form" sx={{ mt: 3, width: '100%' }} noValidate>
              {/* Smooth animated field */}
              <Collapse in={formState === 1} timeout={300}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Collapse>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
    
    </ThemeProvider>
  );
}
