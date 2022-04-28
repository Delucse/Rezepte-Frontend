import React, {useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addRecipeKeyword, removeRecipeKeyword } from "../../actions/recipeActions";

import Textfield from "../Textfield";

import Icon from '@mdi/react';
import { mdiKeyChain } from '@mdi/js';

import { Button } from "@mui/material";
import Chip from '@mui/material/Chip';


function Keywords() {

    const [keyword, setKeyword] = useState('');

    const dispatch = useDispatch();
    const { keywords, error } = useSelector((state) => state.recipe);

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const addKeyword = () => {
        dispatch(addRecipeKeyword(keyword));
        setKeyword('');
    }

    const removeKeyword = (word) => {
        dispatch(removeRecipeKeyword(word))
    }


    return(
        <div style={{marginBottom: '20px'}}>
            <div style={{display: 'flex'}}>
                <Textfield 
                    error={error.keywords} 
                    value={keyword} 
                    onChange={onChangeKeyword} 
                    label='Schlagwörter' 
                    start={
                        <Icon path={mdiKeyChain } size={1}/>
                    }
                />
                <Button
                    sx={{height: '56px', borderRadius: 0, boxShadow: 'none'}} 
                    variant="contained" 
                    onClick={addKeyword}
                    disabled={keyword.length === 0}
                >
                    hinzufügen
                </Button>
            </div>
            {keywords.map((keyword, index) => {
                return (
                    <Chip
                        sx={{marginTop: '10px', marginRight: '5px'}}
                        key={index} 
                        label={keyword}
                        color="primary"
                        onDelete={() => removeKeyword(keyword)} 
                    />
                );
            })}
        </div>
    );
}

export default Keywords;