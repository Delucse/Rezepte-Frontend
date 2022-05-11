import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './pages/Home';
import Test from './pages/Test';
import Error from './pages/Error';
import Test2 from './pages/Test2';
import Pictures from './pages/Pictures';
import Layout from './components/Layout';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import RecipeFormular from './pages/RecipeFormular';

const addAlphaToHex = (color, opacity) => {
  opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + opacity.toString(16).toUpperCase();
}

function App() {

  const themeConfig = {
    palette: {
        primary: {
            main: '#0B6623',//'#E85917',
            light: addAlphaToHex('#0B6623', 0.5)
        }
    }
  };
  const theme = createTheme(themeConfig);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route exact path="test" element={<Test />}/>
                <Route exact path="test2" element={<Test2 />}/>
                <Route exact path="bilder" element={<Pictures />}/>
                <Route path="rezepte">
                  <Route exact path="formular" element={<RecipeFormular />}/>
                  <Route exact path=":id" element={<Recipe />}/>
                  <Route index element={<Recipes />}/>
                </Route>
                <Route path="*" element={<Error />}/>
              </Route>
            </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;