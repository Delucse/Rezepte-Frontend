import React, { lazy, Suspense, useEffect } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { useDispatch, useSelector } from 'react-redux';
import { refreshAuth } from './actions/authActions';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Typography } from '@mui/material';

import Layout from './components/Layout';
import Loader from './components/Loader';

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

const SuspenseRoute = ({ children }) => {
    return <Suspense fallback={<></>}>{children}</Suspense>;
};

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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, [location.pathname]);

    return (
        <ThemeProvider theme={theme}>
            {process.env.REACT_APP_PROGRESS === 'true' ? (
                <Loader />
            ) : (
                <>
                    <Routes location={background || location}>
                        <Route path="/" element={<Layout />}>
                            <Route
                                errorElement={
                                    <Typography color="text.primary">
                                        Interner Fehler: Sorry, Luc hat es
                                        verbockt.
                                    </Typography>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <SuspenseRoute>
                                            <Home />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route path="rezepte">
                                    <Route exact path="formular">
                                        <Route
                                            index
                                            element={
                                                <SuspenseRoute>
                                                    <PrivateRoute>
                                                        <RecipeFormular />
                                                    </PrivateRoute>
                                                </SuspenseRoute>
                                            }
                                        />
                                        <Route
                                            exact
                                            path=":id"
                                            element={
                                                <SuspenseRoute>
                                                    <PrivateRoute>
                                                        <RecipeFormular />
                                                    </PrivateRoute>
                                                </SuspenseRoute>
                                            }
                                        />
                                    </Route>
                                    <Route
                                        exact
                                        path=":id"
                                        element={
                                            <SuspenseRoute>
                                                <Recipe />
                                            </SuspenseRoute>
                                        }
                                    />
                                    <Route
                                        exact
                                        path="favoriten"
                                        element={
                                            <SuspenseRoute>
                                                <PrivateRoute>
                                                    <Recipes route="favoriten" />
                                                </PrivateRoute>
                                            </SuspenseRoute>
                                        }
                                    />
                                    <Route
                                        exact
                                        path="nutzer"
                                        element={
                                            <SuspenseRoute>
                                                <PrivateRoute>
                                                    <Recipes route="nutzer" />
                                                </PrivateRoute>
                                            </SuspenseRoute>
                                        }
                                    />
                                    <Route
                                        exact
                                        path="kleinkind"
                                        element={
                                            <SuspenseRoute>
                                                <Recipes route="kleinkind" />
                                            </SuspenseRoute>
                                        }
                                    />
                                    <Route
                                        exact
                                        path="basis"
                                        element={
                                            <SuspenseRoute>
                                                <Recipes route="basis" />
                                            </SuspenseRoute>
                                        }
                                    />
                                    <Route
                                        index
                                        element={
                                            <SuspenseRoute>
                                                <Recipes route="" />
                                            </SuspenseRoute>
                                        }
                                    />
                                </Route>
                                <Route
                                    exact
                                    path="suche"
                                    element={
                                        <SuspenseRoute>
                                            <Search />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    exact
                                    path="bilder"
                                    element={
                                        <SuspenseRoute>
                                            <PrivateRoute>
                                                <Images />
                                            </PrivateRoute>
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="konto"
                                    element={
                                        <SuspenseRoute>
                                            <PrivateRoute>
                                                <Account />
                                            </PrivateRoute>
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="einstellungen"
                                    element={
                                        <SuspenseRoute>
                                            <Settings />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="faq"
                                    element={
                                        <SuspenseRoute>
                                            <Faq />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="statistiken"
                                    element={
                                        <SuspenseRoute>
                                            <Statistics />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="qr"
                                    element={
                                        <SuspenseRoute>
                                            <Qr />
                                        </SuspenseRoute>
                                    }
                                />
                                {!background && (
                                    <Route
                                        path="anmeldung"
                                        element={
                                            <SuspenseRoute>
                                                <SignIn />
                                            </SuspenseRoute>
                                        }
                                    />
                                )}
                                {!background && (
                                    <Route
                                        path="registrierung"
                                        element={
                                            <SuspenseRoute>
                                                <SignUp />
                                            </SuspenseRoute>
                                        }
                                    />
                                )}
                                {!background && (
                                    <Route
                                        path="verifizierung/:token"
                                        element={
                                            <SuspenseRoute>
                                                <Verification />
                                            </SuspenseRoute>
                                        }
                                    />
                                )}
                                {!background && (
                                    <Route path="passwort">
                                        <Route
                                            exact
                                            path=":id/:token"
                                            element={
                                                <SuspenseRoute>
                                                    <SetPassword />
                                                </SuspenseRoute>
                                            }
                                        />
                                        <Route
                                            index
                                            element={
                                                <SuspenseRoute>
                                                    <ResetPassword />
                                                </SuspenseRoute>
                                            }
                                        />
                                    </Route>
                                )}
                                <Route
                                    path="*"
                                    element={
                                        <SuspenseRoute>
                                            <Error />
                                        </SuspenseRoute>
                                    }
                                />
                            </Route>
                        </Route>
                    </Routes>
                    {background && (
                        <Routes>
                            <Route
                                path="anmeldung"
                                element={
                                    <SuspenseRoute>
                                        <SignIn />
                                    </SuspenseRoute>
                                }
                            />
                            <Route
                                path="registrierung"
                                element={
                                    <SuspenseRoute>
                                        <SignUp />
                                    </SuspenseRoute>
                                }
                            />
                            <Route
                                path="verifizierung/:token"
                                element={
                                    <SuspenseRoute>
                                        <Verification />
                                    </SuspenseRoute>
                                }
                            />
                            <Route path="passwort">
                                <Route
                                    exact
                                    path=":id/:token"
                                    element={
                                        <SuspenseRoute>
                                            <SetPassword />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    index
                                    element={
                                        <SuspenseRoute>
                                            <ResetPassword />
                                        </SuspenseRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    )}
                </>
            )}
        </ThemeProvider>
    );
}

export default App;
