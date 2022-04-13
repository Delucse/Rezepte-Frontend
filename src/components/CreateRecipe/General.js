import React from "react";

import Textfield from "../Textfield";

import Icon from '@mdi/react';
import { mdiSourceRepository } from '@mdi/js'; 
import { Button } from "@mui/material";

function General() {

    return(
        <div>
            <Textfield autoFocus property={'title'} label={'Titel'} start={<Icon path={mdiSourceRepository} size={1}/>} end={<Button sx={{height: '100%', marginRight: '-22px', borderRadius: 0}} variant="contained" onClick={() => alert()}>Test</Button>}/>
            <Textfield property={'title'} label={'Titel'} end={<Icon path={mdiSourceRepository} size={1}/>}/>
            <Textfield disabled placeholder='Quelle eingeben...' property={'source'} label={'Quelle'}/>
        </div>
    );
}

export default General;