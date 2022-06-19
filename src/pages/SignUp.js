import React, { useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Textfield from '../components/Textfield';

import { styled } from '@mui/material/styles';
import { Button, IconButton, Divider } from '@mui/material';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

function SignUp() {

  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const pathname = location.state && location.state.background ? location.state.background.state && location.state.background.state.background ? location.state.background.state.background.pathname : location.state.background.pathname : '/';

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const 
  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog
      open={true}
      backIcon={location.state && location.state.auth}
      onBack={() => navigate('/', {replace: true})}
      closeIcon={location.state && !location.state.auth}
      onClose={() => navigate(pathname, {replace: true})}
      title={
        <div style={{justifyItems: 'center', display: 'grid'}}>
          <Link to='/'><DelucseLogo color='primary' style={{height: '40px', verticalAlign: 'bottom'}}/></Link>
        </div>
      }
      content={
        <div>
          {location.state && location.state.auth ? 
            <div style={{marginBottom: '20px', textAlign: 'center'}}>
              <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px", marginTop: '10px'}}>
              Die aufgerufene Seite ist passwortgeschützt. Registriere dich bitte hier.
              </p>              
              <Divider variant='fullWidth'/>
            </div> 
          : null}
          <div style={{paddingRight: "34px", paddingLeft: "34px", marginTop: '20px'}}>
            <Textfield
              label='Name'
              name='name'
              fullWidth
              margin
            />
            <Textfield
              type='email'
              label='E-Mail'
              name='email'
              fullWidth
              margin
            />
            <Textfield
              type={showPassword ? 'text' : 'password'}
              label='Passwort'
              name='password'
              end={
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  disableRipple
                  sx={{'&:hover': {color: theme => theme.palette.primary.main}}}
                >
                  <Icon path={showPassword ? mdiEyeOff : mdiEye} size={1}/>
                </IconButton>
              }
              fullWidth
            />
            <p style={{marginTop: '20px'}}>
              <Button variant="contained" sx={{borderRadius: 0, width: '100%'}} onClick={() => navigate('/anmeldung', {state: location.state ? {background: location.state.background, auth: location.state.auth} : {}, replace: true})}>Registrieren</Button>
            </p>
          </div>
          <Divider variant='fullWidth'/>
          <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px", marginBottom: 0}}>
            Du hast bereits ein Konto? <StyledLink to="/anmeldung" state={location.state ? {background: location.state.background, auth: location.state.auth} : {}} replace style={{fontWeight: 'bold'}}>Anmelden</StyledLink>
          </p>          
        </div>
      }
    />
  );
}

export default SignUp;
