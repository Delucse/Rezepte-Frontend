import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

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

function SignIn() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
      title={
        <div style={{justifyItems: 'center', display: 'grid'}}>
          <DelucseLogo color='primary' style={{height: '40px', verticalAlign: 'bottom'}}/>
        </div>
      }
      content={
        <div>
          <div style={{paddingRight: "34px", paddingLeft: "34px", marginTop: '20px'}}>
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
              <Button variant="contained" sx={{borderRadius: 0, width: '100%'}} onClick={() => navigate(-1)}>Anmelden</Button>
            </p>
            <p style={{textAlign: 'center', fontSize: '0.8rem'}}>
              <StyledLink to="" replace>Passwort vergessen?</StyledLink>
            </p>
          </div>
          <Divider variant='fullWidth'/>
          <p style={{textAlign: 'center', paddingRight: "34px", paddingLeft: "34px", marginBottom: 0}}>
            Du hast noch kein Konto? <StyledLink to="/registrierung" replace style={{fontWeight: 'bold'}}>Registrieren</StyledLink>
          </p>          
        </div>
      }
    />
  );
}

export default SignIn;
