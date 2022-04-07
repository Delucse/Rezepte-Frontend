import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

import Box from '@mui/material/Box';

function Layout() {

  return (
    <div style={{minHeight: '100vh'}}>
      <Navbar/>
      <Box sx={{padding: (theme) => theme.spacing(2), minHeight: theme => `calc(100vh - 30px - 55px - 2 * ${theme.spacing(2)})`}}>
        <Outlet/>
      </Box>
      {/* Impressum */}
      <div style={{height: '30px', background: 'lightgrey'}}>Impressum</div>
    </div>
  );
}

export default Layout;