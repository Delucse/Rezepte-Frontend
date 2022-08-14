import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    addRecipeKeyword,
    removeRecipeKeyword,
} from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Button from '../Button';

import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiKeyChain } from '@mdi/js';

function Keywords() {
    const [keyword, setKeyword] = useState('');

    const dispatch = useDispatch();
    const keywords = useSelector((state) => state.recipeFormular.keywords);
    const errorKeywords = useSelector(
        (state) => state.recipeFormular.error.keywords
    );

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const addKeyword = () => {
        dispatch(addRecipeKeyword(keyword));
        setKeyword('');
    };

    const removeKeyword = (word) => {
        dispatch(removeRecipeKeyword(word));
    };

    return (
        <div>
            <Typography
                variant="body1"
                sx={{
                    color: (theme) => theme.palette.text.primary,
                    marginBottom: '15px',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                }}
            >
                Sollten dir Kategorien fehlen, kannst du hier eigene
                Schlagwörter hinzufügen, um dein Rezept besser zu beschreiben
                (Beispiel: "Grillen" oder "Salat").
            </Typography>
            <div style={{ display: 'flex' }}>
                <Textfield
                    error={errorKeywords}
                    value={keyword}
                    onChange={onChangeKeyword}
                    label="Schlagwörter"
                    start={<Icon path={mdiKeyChain} size={1} />}
                />
                <Button
                    sx={{ height: '56px' }}
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
                        sx={{ marginTop: '10px', marginRight: '5px' }}
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
