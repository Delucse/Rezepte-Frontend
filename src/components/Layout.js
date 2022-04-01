import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{background: 'grey', textAlign: 'center', minHeight: '100vh', justifyContent: 'center'}}>
        <Outlet/>
    </div>
  );
}

export default Layout;