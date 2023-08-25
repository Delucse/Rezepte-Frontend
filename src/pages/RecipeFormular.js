import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    setRecipeFormular,
    setUploaded,
    setBlocked,
} from '../actions/recipeFormularActions';
import { getRecipe, getRecipePrototype } from '../actions/recipeActions';
import { setProgressError } from '../actions/progressActions';

import { useLocation, useParams } from 'react-router-dom';

import General from '../components/RecipeFormular/General';
import NewIngredients from '../components/RecipeFormular/Ingredients';
import Steps from '../components/RecipeFormular/Steps';
import Preview from '../components/RecipeFormular/Preview';
import Pictures from '../components/RecipeFormular/Pictures';
import Stepper from '../components/RecipeFormular/Stepper';
import Keywords from '../components/RecipeFormular/Keywords';
import Loader from '../components/Loader';
import Link from '../components/Link';

import { Box, Typography } from '@mui/material';

const steps = [
    {
        title: 'Allgemein',
        help: 'Angabe von generischen Informationen wie Titel, Portionsangaben und benötigte Zeit.',
        content: <General />,
    },
    {
        title: 'Kategorien',
        help: 'Die Angabe von Kategorien dient einer treffenden Beschreibung deines Rezepts und damit einer besseren Such-und Filtermöglichkeit.',
        content: <Keywords />,
    },
    {
        title: 'Zutaten',
        help: 'Die Angaben von Zutaten können in thematischen Blöcken erfolgen (z.B. Unterscheidung von Teig und Belag). Jeder Zutatenblock enthält einen Titel und mindestens eine Zutatenangabe.',
        content: <NewIngredients />,
    },
    {
        title: 'Arbeitsschritte',
        help: 'Arbeitschritte meint eine Beschreibung des Ablaufs von Anfang bis Ende. Es muss mindestens ein Arbeitsschritt vorhanden sein.',
        content: <Steps />,
    },
    {
        title: 'Bilder',
        help: 'Es dürfen nur maximal vier Bilder je Nutzer je Rezept hochgeladen werden. Gültige Bildformate sind ".png", ".jpg" und ".jpeg".',
        content: <Pictures />,
    },
    {
        title: 'Zusammenfassung',
        help: 'Anzeige einer Rezept-Vorschau, sobald alle verpflichtenden Angaben korrekt gemacht worden sind.',
        content: <Preview />,
    },
];

function RecipeFormular() {
    const dispatch = useDispatch();
    const recipeId = useSelector((state) => state.recipe.id);
    const prototypeId = useSelector((state) => state.recipe.prototype);
    const formularId = useSelector((state) => state.recipeFormular.id);
    // const recipePictures = useSelector((state) => state.recipe.pictures);

    const error = useSelector(
        (state) => state.progress.error && state.progress.type === 'recipe'
    );
    const internalError = useSelector(
        (state) => state.progress.error && state.progress.type === 'recipeError'
    );

    const { id } = useParams();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(setBlocked(true));
        dispatch(setUploaded(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (id) {
            if (
                (!pathname.includes('vorlagen') && id !== recipeId) ||
                (pathname.includes('vorlagen') && id !== prototypeId)
            ) {
                if (/^.{24}$/.test(id)) {
                    if (
                        pathname.replace(`/${id}`, '') ===
                        '/rezepte/formular/vorlagen'
                    ) {
                        dispatch(getRecipePrototype(id));
                    } else {
                        dispatch(getRecipe(id));
                    }
                } else {
                    dispatch(setProgressError('recipe'));
                }
            } else {
                dispatch(setRecipeFormular());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeId, prototypeId]);

    return !(error || internalError) ? (
        id && formularId && id !== formularId && recipeId !== formularId ? (
            <>
                <Box
                    sx={{
                        background: (theme) => theme.palette.background.default,
                        color: (theme) => theme.palette.text.primary,
                        height: '100%',
                        position: 'absolute',
                        zIndex: 4,
                        width: {
                            xs: 'calc(100% - 2 * 24px)',
                            md: 'calc(100% - 2 * 15px - 1px)',
                        },
                    }}
                >
                    Daten werden geladen ...
                </Box>
                <Loader
                    style={{
                        backgroundColor: 'transparent',
                        top: 'calc(55px + 78px)',
                        bottom: { xxs: '261px', xs: '178px', sm: '113px' },
                    }}
                />
            </>
        ) : (
            <Stepper steps={steps} />
        )
    ) : error ? (
        <Typography color="text.primary" variant="body2">
            Oops, das Rezept existiert nicht (mehr). Zurück zu deinen{' '}
            <Link to="/rezepte/nutzer">Rezepten</Link>.
        </Typography>
    ) : (
        <Typography color="text.primary" variant="body2">
            Dein Rezept kann gerade nicht abgerufen und daher auch nicht
            bearbeitet werden. Versuche es einfach zu einem späteren Zeitpunkt
            erneut.
        </Typography>
    );
}

export default RecipeFormular;
