import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import BreadCrumbs from './BreadCrumbs';

import Box from '@mui/material/Box';

function Layout() {

  return (
    <div style={{minHeight: '100vh'}}>
      <Navbar/>
      <BreadCrumbs />
      <Box sx={{zIndex: 0, position: 'relative', padding: (theme) => `0 ${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(3)}`, minHeight: theme => `calc(100vh - 30px - 55px - 2 * ${theme.spacing(3)})`, background: 'white'}}>
        <Outlet/>
      </Box>
      {/* Impressum */}
      {/* <div style={{height: '30px', background: 'lightgrey'}}>Impressum</div> */}
    </div>
  );
}

export default Layout;