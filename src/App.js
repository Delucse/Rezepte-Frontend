import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Test from './pages/Test';
import Error from './pages/Error';
import Test2 from './pages/Test2';
import Pictures from './pages/Pictures';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route exact path="test" element={<Test />}/>
            <Route exact path="test2" element={<Test2 />}/>
            <Route exact path="bilder" element={<Pictures />}/>
            <Route path="*" element={<Error />}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;