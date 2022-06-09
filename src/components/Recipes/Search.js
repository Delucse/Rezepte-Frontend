import React, { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setWord } from '../../actions/recipeFilterActions';

import Button from '@mui/material/Button';

import Textfield from '../Textfield';

import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';


function Search() {

    const dispatch = useDispatch();
    const { word } = useSelector(state => state.recipeFilter);

    const [search, setSearch] = useState(word);

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Textfield
                value={search}
                placeholder="Suchwort ..."
                onChange={(e) => setSearch(e.target.value)}
                start={<div/>}
            />
            <Button
                sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '56px', padding: 0}} 
                variant="contained"
                disableRipple
                onClick={() => dispatch(setWord(search))} 
            >
                <Icon path={mdiMagnify} size={1}/>
            </Button>
        </div>
    );
}

export default Search;

