import React from 'react';

import { useSelector } from "react-redux";

import { Outlet } from 'react-router-dom';

import Loader from './Loader';
import Navbar from './Navbar';
import BreadCrumbs from './BreadCrumbs';

import Box from '@mui/material/Box';

function Layout() {

  const {loading} = useSelector((state) => state.auth);
  // const loaded = true;

  return (
    loading ? 
      <Loader />
    :
      <div style={{minHeight: '100vh'}}>
        <Navbar/>
        <BreadCrumbs />
        <Box sx={{zIndex: 0, position: 'relative', padding: (theme) => `0 ${theme.spacing(3)} ${theme.spacing(0)} ${theme.spacing(3)}`, minHeight: theme => `calc(100vh - 55px - ${theme.spacing(3)} - 78px)`, background: 'white'}}>
          <Outlet/>
        </Box>
        <Box sx={{zIndex: 1, padding: theme => `${theme.spacing(3)} ${theme.spacing(3)} 0px ${theme.spacing(3)}`, position: 'sticky', bottom: 0, background: 'white'/*'linear-gradient(transparent 0%, white 40%)'*/}}/>
        {/* Impressum */}
        {/* <div style={{height: '30px', background: 'lightgrey'}}>Impressum</div> */}
      </div>
  );
}

export default Layout;