import React, { useEffect } from 'react';

import { useDispatch } from "react-redux";
import { resetRecipeFormular } from '../actions/recipeFormularActions';

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


function CreateRecipe() {

    const dispatch = useDispatch();

    useEffect(() => {    
        return () => {      
            dispatch(resetRecipeFormular());
        };  
    });
    
    return (
        <Stepper steps={steps} />        
    );
}

export default CreateRecipe;
