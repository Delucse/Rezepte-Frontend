import React from 'react';
import General from '../components/CreateRecipe/General';
import Ingredients from '../components/CreateRecipe/Ingredients';

import Stepper from '../components/CreateRecipe/Stepper';

const steps = [
    {
        title: 'Allgemein',
        content: <General/>
    },{
        title: 'Bilder',
        content: <div>Step 2</div>
    },{
        title: 'Zutaten',
        content: <Ingredients />
    },{
        title: 'Arbeitsschritte',
        content: <div>Step 4</div>
    },{
        title: 'Zusammenfassung',
        content: <div>Vorschau</div>
    }
];


function CreateRecipe() {
    
    return (
        <Stepper steps={steps} />        
    );
}

export default CreateRecipe;
