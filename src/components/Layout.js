import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div style={{background: 'grey', textAlign: 'center', minHeight: '100vh', justifyContent: 'center'}}>
        <nav style={{display: 'flex'}}>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div style={{margin: '0 10px'}}>
            <Link to="/test">Test</Link>
          </div>
          <div>
            <Link to="/test2">Test2</Link>
          </div>
          <div style={{margin: '0 10px'}}>
            <Link to="/bilder">Bilder</Link>
          </div>
          <div>
            <Link to="/e">Error</Link>
          </div>
        </nav>
        <Outlet/>
    </div>
  );
}

export default Layout;