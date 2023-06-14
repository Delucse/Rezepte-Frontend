import React from 'react';

import { useSelector } from 'react-redux';

import { Helmet } from 'react-helmet';

import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';

import params from '../data/params.json';

function Link({ pathname, title }) {
    return pathname ? (
        <Box
            sx={{
                color: (theme) => theme.palette.primary.light,
                '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                },
            }}
        >
            <RouterLink
                to={pathname}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                {title}
            </RouterLink>
        </Box>
    ) : (
        <>
            <DocumentTitle title={`${title} | Delucse`} />
            {title}
        </>
    );
}

function RecipeLink({ formular }) {
    const { id } = useParams();

    const title = useSelector((state) => state.recipe.title);
    const error = useSelector(
        (state) => state.progress.error && state.progress.type === 'recipe'
    );
    const internalError = useSelector(
        (state) => state.progress.error && state.progress.type === 'recipeError'
    );
    const result = title
        ? title
        : error
        ? 'Unbekannt'
        : internalError
        ? 'Fehler'
        : 'lädt ...';

    return (
        <Link title={result} pathname={formular ? `/rezepte/${id}` : null} />
    );
}

function SearchLink({ pathname }) {
    const word = useSelector((state) => state.recipeFilter.word);
    const type = useSelector((state) => state.recipeFilter.type);
    const title = `${
        type === 'all'
            ? 'Suche'
            : type === 'title'
            ? 'Titelsuche'
            : type === 'ingredients'
            ? 'Zutatensuche'
            : type === 'keywords'
            ? 'Schlüsselwortsuche'
            : type === 'steps'
            ? 'Arbeitsschrittsuche'
            : 'Suche'
    }${pathname ? `${' '}${word !== '' ? ` von "${word}"` : ''}` : ''}`;

    return <Link pathname={pathname ? '/suche' : null} title={title} />;
}

function RecipesOverviewLink({ pathname, title }) {
    const word = useSelector((state) => state.recipeFilter.word);
    const sort = useSelector((state) => state.recipeFilter.sort);
    const type = useSelector((state) => state.recipeFilter.type);
    const categories = useSelector((state) => state.recipeFilter.categories);

    var path = pathname;
    if (word !== '') {
        path += `&wort=${word}`;
    }
    if (type !== 'all') {
        path += `&typ=${params.type[type.toLowerCase()]}`;
    }
    if (sort.type !== 'score') {
        path += `&sortierung=${params.sort.type[sort.type.toLowerCase()]}`;
    }
    if (sort.ascending !== false) {
        path += `&reihenfolge=${params.sort.ascending[sort.ascending]}`;
    }
    if (categories.length > 0) {
        path += `&filter=${categories.join(',')}`;
    }
    if (path !== pathname) {
        path = path.replace('&', '?');
    }

    return <Link pathname={path} title={title} />;
}

const routes = [
    { pathname: /^\/$/i, breadcrumbs: [] },
    { pathname: /^\/(anmeldung|registrierung)$/i, breadcrumbs: [] },
    { pathname: /^\/verifizierung\/.*$/i, breadcrumbs: [] },
    { pathname: /^\/passwort$/i, breadcrumbs: [] },
    { pathname: /^\/passwort\/.*\/.*$/i, breadcrumbs: [] },
    {
        pathname: /^\/rezepte$/i,
        breadcrumbs: [<SearchLink pathname />, <Link title="Rezepte" />],
    },
    {
        pathname: /^\/rezepte\/nutzer$/i,
        breadcrumbs: [
            <SearchLink pathname />,
            <RecipesOverviewLink pathname="/rezepte" title="Rezepte" />,
            <Link title="Nutzer" />,
        ],
    },
    {
        pathname: /^\/rezepte\/favoriten$/i,
        breadcrumbs: [
            <SearchLink pathname />,
            <RecipesOverviewLink title="Rezepte" pathname="/rezepte" />,
            <Link title="Favoriten" />,
        ],
    },
    {
        pathname: /^\/rezepte\/kleinkind$/i,
        breadcrumbs: [
            <SearchLink pathname />,
            <RecipesOverviewLink pathname="/rezepte" title="Rezepte" />,
            <Link title="Baby & Kleinkinder" />,
        ],
    },
    {
        pathname: /^\/rezepte\/basis$/i,
        breadcrumbs: [
            <SearchLink pathname />,
            <RecipesOverviewLink pathname="/rezepte" title="Rezepte" />,
            <Link title="Grundrezepte" />,
        ],
    },
    {
        pathname: /^\/rezepte\/vorlagen$/i,
        breadcrumbs: [
            <Link pathname="/rezepte" title="Rezepte" />,
            <Link pathname="/rezepte/nutzer" title="Nutzer" />,
            <Link title="Vorlagen" />,
        ],
    },
    {
        pathname: /^\/rezepte\/formular$/i,
        breadcrumbs: [
            <Link pathname="/rezepte" title="Rezepte" />,
            <Link pathname="/rezepte/nutzer" title="Nutzer" />,
            <Link title="Formular" />,
        ],
    },
    {
        pathname: /^\/rezepte\/formular\/vorlagen\/.*$/i,
        breadcrumbs: [
            <Link pathname="/rezepte" title="Rezepte" />,
            <Link pathname="/rezepte/nutzer" title="Nutzer" />,
            <Link pathname="/rezepte/vorlagen" title="Vorlagen" />,
            <Link title="Formular" />,
        ],
    },
    {
        pathname: /^\/rezepte\/formular\/.*$/i,
        breadcrumbs: [
            <Link pathname="/rezepte" title="Rezepte" />,
            <Link pathname="/rezepte/nutzer" title="Nutzer" />,
            <RecipeLink formular />,
            <Link title="Formular" />,
        ],
    },
    {
        pathname: /^\/rezepte\/.*$/i,
        breadcrumbs: [
            <SearchLink pathname />,
            <RecipesOverviewLink pathname="/rezepte" title="Rezepte" />,
            <RecipesOverviewLink
                pathname="/rezepte/nutzer"
                title="Nutzer"
                condition="nutzer"
            />,
            <RecipesOverviewLink
                pathname="/rezepte/favoriten"
                title="Favoriten"
                condition="favoriten"
            />,
            <RecipesOverviewLink
                pathname="/rezepte/kleinkind"
                title="Baby & Kleinkinder"
                condition="kleinkind"
            />,
            <RecipesOverviewLink
                pathname="/rezepte/basis"
                title="Grundrezepte"
                condition="basis"
            />,
            <RecipeLink />,
        ],
    },
    {
        pathname: /^\/suche$/i,
        breadcrumbs: [<SearchLink />],
    },
    {
        pathname: /^\/bilder$/i,
        breadcrumbs: [<Link title="Meine Bilder" />],
    },
    {
        pathname: /^\/konto$/i,
        breadcrumbs: [<Link title="Konto" />],
    },
    {
        pathname: /^\/einstellungen$/i,
        breadcrumbs: [<Link title="Einstellungen" />],
    },
    {
        pathname: /^\/faq$/i,
        breadcrumbs: [<Link title="FAQ" />],
    },
    {
        pathname: /^\/impressum$/i,
        breadcrumbs: [<Link title="Impressum" />],
    },
    {
        pathname: /^\/datenschutz$/i,
        breadcrumbs: [<Link title="Datenschutz" />],
    },
    {
        pathname: /^\/statistiken$/i,
        breadcrumbs: [<Link title="Statistiken" />],
    },
    {
        pathname: /^\/qr$/i,
        breadcrumbs: [<Link title="QR-Code auslesen" />],
    },
    {
        pathname: /^.*$/i,
        breadcrumbs: [<Link title="Unbekannt" />],
    },
];

function DocumentTitle({ title }) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}

function BreadCrumbs() {
    const route = useSelector((state) => state.recipeFilter.route);

    const location = useLocation();
    const pathname =
        location.state && location.state.background
            ? location.state.background.state &&
              location.state.background.state.background
                ? location.state.background.state.background.pathname
                : location.state.background.pathname
            : location.pathname;

    const breadcrumbs = routes
        .filter((route) => route.pathname.test(pathname))[0]
        .breadcrumbs.filter(
            (bc) =>
                !bc.props ||
                !bc.props.hasOwnProperty('condition') ||
                (bc.props.hasOwnProperty('condition') &&
                    bc.props.condition === route)
        );

    return (
        <>
            <DocumentTitle title={'Delucse'} />
            {breadcrumbs.length > 0 ? (
                <Box
                    sx={{
                        height: '30px',
                        background: (theme) => theme.palette.background.default,
                        padding: (theme) =>
                            `${theme.spacing(3)} ${theme.spacing(
                                3
                            )} 0px ${theme.spacing(3)}`,
                        width: (theme) =>
                            `calc(100% - 2 * ${theme.spacing(3)})`,
                        overflowY: 'hidden',
                        zIndex: (theme) => theme.zIndex.appBar - 20,
                        position: 'sticky',
                        top: '55px',
                    }}
                >
                    <Box
                        sx={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            display: 'flex',
                        }}
                    >
                        <Breadcrumbs
                            separator="›"
                            sx={{
                                marginBottom: '10px',
                                '.MuiBreadcrumbs-ol': {
                                    flexWrap: 'nowrap',
                                },
                                '.MuiBreadcrumbs-li': {
                                    width: 'max-content',
                                },
                            }}
                        >
                            <Link
                                pathname={'/'}
                                title={
                                    <Icon
                                        path={mdiHome}
                                        size={1}
                                        style={{ color: 'inherit' }}
                                    />
                                }
                            />
                            {breadcrumbs.map((link, index) => {
                                return <div key={index}>{link}</div>;
                            })}
                        </Breadcrumbs>
                    </Box>
                </Box>
            ) : null}
            <Box
                sx={{
                    height: (theme) =>
                        theme.spacing(breadcrumbs.length > 0 ? 3 : 0),
                    padding: (theme) =>
                        breadcrumbs.length > 0
                            ? 0
                            : `${theme.spacing(3)} ${theme.spacing(
                                  3
                              )} 0px ${theme.spacing(3)}`,
                    background: (theme) =>
                        theme.palette.background
                            .default /*'linear-gradient(white 0%, transparent 60%)'*/,
                    position: 'sticky',
                    top:
                        breadcrumbs.length > 0
                            ? 'calc(55px + 30px + 24px)'
                            : '55px',
                    zIndex: (theme) => theme.zIndex.appBar - 40,
                }}
            />
        </>
    );
}

export default BreadCrumbs;
