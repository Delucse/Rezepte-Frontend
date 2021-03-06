import React, { useEffect } from 'react';

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

const steps = [
    {
        title: 'Allgemein',
        content: <General />,
    },
    {
        title: 'Kategorien',
        content: <Categories />,
    },
    {
        title: 'Zutaten',
        content: <Ingredients />,
    },
    {
        title: 'Arbeitsschritte',
        content: <Steps />,
    },
    {
        title: 'Bilder',
        content: <Pictures />,
    },
    {
        title: 'Zusammenfassung',
        content: <Preview />,
    },
];

function RecipeFormular() {
    const dispatch = useDispatch();
    const blocked = useSelector((state) => state.recipeFormular.blocked);
    const recipeId = useSelector((state) => state.recipe.id);
    const recipePictures = useSelector((state) => state.recipe.pictures);
    const uploaded = useSelector((state) => state.recipeFormular.uploaded);
    const formularFilled = useSelector(
        (state) => state.recipeFormular.portion.count > 0
    );

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

    const [showDialogLeavingPage, confirmNavigation, cancelNavigation] =
        usePrompt(blocked);

    return (
        <div>
            {uploaded || !id || (id && id === recipeId && formularFilled) ? (
                <Stepper steps={steps} />
            ) : (
                'Daten werden geladen ...'
            )}
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
