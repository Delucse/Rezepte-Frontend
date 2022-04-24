import React from 'react';

import General from '../components/CreateRecipe/General';
import Ingredients from '../components/CreateRecipe/Ingredients';
import Steps from '../components/CreateRecipe/Steps';
import Preview from '../components/CreateRecipe/Preview';
import Pictures from '../components/CreateRecipe/Pictures';
import Stepper from '../components/CreateRecipe/Stepper';

const steps = [
    {
        title: 'Allgemein',
        content: <General/>
    },{
        title: 'Kategorien',
        content: <div>Step 2</div>
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
    
    return (
        <Stepper steps={steps} />        
    );
}

export default CreateRecipe;
