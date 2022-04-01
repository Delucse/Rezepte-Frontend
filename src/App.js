import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Test from './pages/Test';
import Error from './pages/Error';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route exact path="test" element={<Test />}/>
            <Route path="*" element={<Error />}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
