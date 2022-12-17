import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetRecipeFormular,
    setBlocked,
    setRecipeFormular,
    setUploaded,
} from '../actions/recipeFormularActions';
import { getRecipe } from '../actions/recipeActions';
import { setProgressError } from '../actions/progressActions';

import { useParams } from 'react-router-dom';

import { usePrompt } from '../hooks/usePrompt';
import NavigationPrompt from '../components/NavigationPrompt';

import General from '../components/RecipeFormular/General';
import Ingredients from '../components/RecipeFormular/Ingredients';
import Steps from '../components/RecipeFormular/Steps';
import Preview from '../components/RecipeFormular/Preview';
import Pictures from '../components/RecipeFormular/Pictures';
import Stepper from '../components/RecipeFormular/Stepper';
import Categories from '../components/RecipeFormular/Categories';

import { Box } from '@mui/material';

const steps = [
    {
        title: 'Allgemein',
        help: 'Angabe von generischen Informationen wie Titel, Portionsangaben und benötigte Zeit.',
        content: <General />,
    },
    {
        title: 'Kategorien',
        help: 'Die Angabe von Kategorien dient einer besseren Beschreibung deines Rezepts und damit einer guten Such-und Filtermöglichkeit.',
        content: <Categories />,
    },
    {
        title: 'Zutaten',
        help: 'Die Angaben von Zutaten können in thematischen Blöcken erfolgen (z.B. Unterscheidung von Teig und Belag). Jeder Zutatenblock enthält einen Titel und mindestens eine Zutatenangabe.',
        content: <Ingredients />,
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
    const blocked = useSelector((state) => state.recipeFormular.blocked);
    const recipeId = useSelector((state) => state.recipe.id);
    const recipePictures = useSelector((state) => state.recipe.pictures);

    const { id } = useParams();

    useEffect(() => {
        dispatch(setBlocked(true));
        dispatch(setUploaded(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (id) {
            if (
                id !== recipeId ||
                recipePictures.filter((pic) => !pic._id).length > 0
            ) {
                if (/^.{24}$/.test(id)) {
                    dispatch(getRecipe(id, true));
                } else {
                    dispatch(setProgressError('recipeFormular'));
                }
            } else {
                dispatch(setRecipeFormular());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeId]);

    const [wait, setWait] = useState(0);
    useEffect(() => {
        if (wait < 1) {
            setTimeout(() => {
                setWait(wait + 1);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wait]);

    const [showDialogLeavingPage, confirmNavigation, cancelNavigation] =
        usePrompt(blocked);

    return (
        <div>
            {wait < 1 && id ? (
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
            ) : null}
            <Stepper steps={steps} />
            <NavigationPrompt
                open={showDialogLeavingPage}
                closePrompt={(bool) => dispatch(setBlocked(bool))}
                confirmNavigation={() => {
                    dispatch(resetRecipeFormular());
                    confirmNavigation();
                }}
                cancelNavigation={cancelNavigation}
            />
        </div>
    );
}

export default RecipeFormular;
