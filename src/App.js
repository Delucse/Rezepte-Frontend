import React, { useEffect } from 'react';

import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './pages/Home';
import Error from './pages/Error';
import Layout from './components/Layout';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import RecipeFormular from './pages/RecipeFormular';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Search from './pages/Search';

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

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes location={background || location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="rezepte">
              <Route exact path="formular" element={<PrivateRoute><RecipeFormular /></PrivateRoute>}/>
              <Route exact path=":id" element={<Recipe />}/>
              <Route exact path='favoriten' element={<PrivateRoute><Recipes route='favoriten'/></PrivateRoute>}/>
              <Route exact path='nutzer' element={<PrivateRoute><Recipes route='nutzer'/></PrivateRoute>}/>
              <Route index element={<Recipes route=''/>}/>
            </Route>
            <Route path="suche" element={<Search/>}/>
            <Route path="konto" element={<div>Konto TODO</div>}/>
            <Route path="einstellungen" element={<div>Einstellungen TODO</div>}/>
            <Route path="qr" element={<div>QR-Code TODO</div>}/>
            {!background &&
              <Route path="anmeldung" element={<SignIn />} />}
            {!background &&
              <Route path="registrierung" element={<SignUp />}/>}
            <Route path="*" element={<Error />}/>
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route path="anmeldung" element={<SignIn />}/>
            <Route path="registrierung" element={<SignUp />}/>
          </Routes>
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default App;