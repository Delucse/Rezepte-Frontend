import React, { useState } from 'react';

import { useDispatch } from "react-redux";
import { resetRecipeFormular } from '../actions/recipeFormularActions';

import {usePrompt} from '../hooks/usePrompt';
import NavigationPrompt from "../components/NavigationPrompt";

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
        content: <General/>
    },{
        title: 'Kategorien',
        content: <Categories />
    },{
        title: 'Zutaten',
        content: <Ingredients />
    },{
        title: 'Arbeitsschritte',
        content: <Steps />
    },{
        title: 'Bilder',
        content: <Pictures />
    },{
        title: 'Zusammenfassung',
        content: <Preview />
    }
];


function RecipeFormular() {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);

    const [
        showDialogLeavingPage,
        confirmNavigation,
        cancelNavigation
      ] = usePrompt(open);
    
    return (
        <div>
            <Stepper steps={steps} />
            <NavigationPrompt
                open={showDialogLeavingPage}
                closePrompt={setOpen}
                confirmNavigation={() => { dispatch(resetRecipeFormular()); confirmNavigation(); }}
                cancelNavigation={cancelNavigation}
            />
        </div>
               
    );
}

export default RecipeFormular;
