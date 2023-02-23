import React, { lazy, Suspense, useEffect } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { useDispatch, useSelector } from 'react-redux';
import { refreshAuth } from './actions/authActions';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Typography } from '@mui/material';

import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Recipe = lazy(() => import('./pages/Recipe'));
const RecipeFormular = lazy(() => import('./pages/RecipeFormular'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Search = lazy(() => import('./pages/Search'));
const Settings = lazy(() => import('./pages/Settings'));
const Images = lazy(() => import('./pages/Images'));
const Faq = lazy(() => import('./pages/Faq'));
const Qr = lazy(() => import('./pages/Qr'));
const Account = lazy(() => import('./pages/Account'));
const Verification = lazy(() => import('./pages/Verification'));
const SetPassword = lazy(() => import('./pages/SetPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Statistics = lazy(() => import('./pages/Statistics'));

function App() {
    const dispatch = useDispatch();
    const color = useSelector((state) => state.settings.color);

    useEffect(() => {
        document.body.style.setProperty('--main', color.main);
        document.body.style.setProperty('--light', color.light);
    }, [color]);

    const systemModeIsDark = useMediaQuery('(prefers-color-scheme: dark)');

    const themeConfig = {
        zIndex: { appBar: 1301 },
        palette: {
            primary: {
                main: color.main,
                light: color.light,
            },
            action: {
                hover:
                    color.mode === 'system'
                        ? systemModeIsDark
                            ? 'rgb(37, 37, 37)'
                            : 'rgb(245, 245, 245)'
                        : color.mode === 'dark'
                        ? 'rgb(37, 37, 37)'
                        : 'rgb(245, 245, 245)',
            },
            mode:
                color.mode === 'system'
                    ? systemModeIsDark
                        ? 'dark'
                        : 'light'
                    : color.mode,
        },
        components: {
            MuiClockPicker: {
                styleOverrides: {
                    root: {
                        width: '280px',
                    },
                },
            },
        },
    };
    const theme = createTheme(themeConfig);

    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(refreshAuth());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Layout />}>
                <Routes location={background || location}>
                    <Route path="/" element={<Layout />}>
                        <Route
                            errorElement={
                                <Typography color="text.primary">
                                    Interner Fehler: Sorry, Luc hat es verbockt.
                                </Typography>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="rezepte">
                                <Route exact path="formular">
                                    <Route
                                        index
                                        element={
                                            <PrivateRoute>
                                                <RecipeFormular />
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route
                                        exact
                                        path=":id"
                                        element={
                                            <PrivateRoute>
                                                <RecipeFormular />
                                            </PrivateRoute>
                                        }
                                    />
                                </Route>
                                <Route exact path=":id" element={<Recipe />} />
                                <Route
                                    exact
                                    path="favoriten"
                                    element={
                                        <PrivateRoute>
                                            <Recipes route="favoriten" />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="nutzer"
                                    element={
                                        <PrivateRoute>
                                            <Recipes route="nutzer" />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="kleinkind"
                                    element={<Recipes route="kleinkind" />}
                                />
                                <Route
                                    exact
                                    path="basis"
                                    element={<Recipes route="basis" />}
                                />
                                <Route index element={<Recipes route="" />} />
                            </Route>
                            <Route exact path="suche" element={<Search />} />
                            <Route
                                exact
                                path="bilder"
                                element={
                                    <PrivateRoute>
                                        <Images />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="konto"
                                element={
                                    <PrivateRoute>
                                        <Account />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="einstellungen"
                                element={<Settings />}
                            />
                            <Route path="faq" element={<Faq />} />
                            <Route
                                path="statistiken"
                                element={<Statistics />}
                            />
                            <Route path="qr" element={<Qr />} />
                            {!background && (
                                <Route path="anmeldung" element={<SignIn />} />
                            )}
                            {!background && (
                                <Route
                                    path="registrierung"
                                    element={<SignUp />}
                                />
                            )}
                            {!background && (
                                <Route
                                    path="verifizierung/:token"
                                    element={<Verification />}
                                />
                            )}
                            {!background && (
                                <Route path="passwort">
                                    <Route
                                        exact
                                        path=":id/:token"
                                        element={<SetPassword />}
                                    />
                                    <Route index element={<ResetPassword />} />
                                </Route>
                            )}
                            <Route path="*" element={<Error />} />
                        </Route>
                    </Route>
                </Routes>
                {background && (
                    <Routes>
                        <Route path="anmeldung" element={<SignIn />} />
                        <Route path="registrierung" element={<SignUp />} />
                        <Route
                            path="verifizierung/:token"
                            element={<Verification />}
                        />
                        <Route path="passwort">
                            <Route
                                exact
                                path=":id/:token"
                                element={<SetPassword />}
                            />
                            <Route index element={<ResetPassword />} />
                        </Route>
                    </Routes>
                )}
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
