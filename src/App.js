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
import SetPassword from './pages/SetPassword';
import Verification from './pages/Verification';

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
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Statistics = lazy(() => import('./pages/Statistics'));
const LegalNotice = lazy(() => import('./pages/LegalNotice'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));

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
        breakpoints: {
            values: {
                xxs: 0,
                xs: 300,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
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
                                <Route
                                    path="impressum"
                                    element={
                                        <SuspenseRoute>
                                            <LegalNotice />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="datenschutz"
                                    element={
                                        <SuspenseRoute>
                                            <Privacy />
                                        </SuspenseRoute>
                                    }
                                />
                                <Route
                                    path="kontakt"
                                    element={
                                        <SuspenseRoute>
                                            <Contact />
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
                                            path="vorlagen/:id"
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
                                        exact
                                        path="vorlagen"
                                        element={
                                            <SuspenseRoute>
                                                <PrivateRoute>
                                                    <Recipes route="vorlage" />
                                                </PrivateRoute>
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
                                element={<Verification />}
                            />
                            <Route path="passwort">
                                <Route
                                    exact
                                    path=":id/:token"
                                    element={<SetPassword />}
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
