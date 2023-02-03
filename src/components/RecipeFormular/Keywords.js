import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
    addRecipeKeyword,
    addRecipeKeywords,
    removeRecipeKeyword,
    removeRecipeKeywords,
} from '../../actions/recipeFormularActions';

import Alert from '../Alert';
import Textfield from '../Textfield';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Categories from '../Recipes/Categories';

import { Box, Typography, Chip } from '@mui/material';

import Icon from '@mdi/react';
import { mdiKeyChain } from '@mdi/js';

import params from '../../data/params.json';

const paramKeywords = [];
Object.entries(params.filter).forEach(([key, value]) => {
    paramKeywords.push(...value);
});
['Basic', 'Baby'].forEach((exception) => paramKeywords.push(exception));

function Keyword({ label, value }) {
    const dispatch = useDispatch();

    const checked = useSelector((state) =>
        state.recipeFormular.keywords.includes(value)
    );
    const error = useSelector(
        (state) => state.recipeFormular.error.keywords && !checked
    );

    return (
        <Checkbox
            label={label}
            value={value}
            checked={checked}
            error={error}
            onChecked={(e) => dispatch(addRecipeKeyword(e))}
            onUnchecked={(e) => dispatch(removeRecipeKeyword(e))}
        />
    );
}

function IndividualKeywords() {
    var [keyword, setKeyword] = useState('');

    const dispatch = useDispatch();
    const keywords = useSelector((state) =>
        state.recipeFormular.keywords.filter(
            (word) => !paramKeywords.includes(word)
        )
    );
    const error = useSelector((state) => state.recipeFormular.error.keywords);

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const addKeyword = () => {
        var regExp = new RegExp(`^${keyword}$`, 'i');
        paramKeywords.forEach((paramKey) => {
            if (regExp.test(paramKey)) {
                keyword = paramKey;
            }
        });
        dispatch(addRecipeKeyword(keyword));
        setKeyword('');
    };

    return (
        <div style={{ marginTop: '24px' }}>
            <Typography
                variant="body1"
                sx={{
                    color: (theme) => theme.palette.text.primary,
                    marginBottom: '15px',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                }}
            >
                Sollten dir Kategorien fehlen, kannst du hier eigene Schlagworte
                hinzufügen, um dein Rezept besser zu beschreiben (Beispiel:
                "Grillen" oder "Salat").
            </Typography>
            <div style={{ display: 'flex' }}>
                <Textfield
                    error={error}
                    value={keyword}
                    onChange={onChangeKeyword}
                    label="Schlagworte"
                    start={<Icon path={mdiKeyChain} size={1} />}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            addKeyword();
                        }
                    }}
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
                        onDelete={() => dispatch(removeRecipeKeyword(keyword))}
                    />
                );
            })}
        </div>
    );
}

function KeywordCategories() {
    const dispatch = useDispatch();

    const keywords = useSelector((state) => state.recipeFormular.keywords);
    const error = useSelector((state) => state.recipeFormular.error.keywords);

    return (
        <Categories
            values={keywords}
            error={error}
            onCheckedTitle={(e) => dispatch(addRecipeKeywords(e))}
            onUncheckedTitle={(e) => dispatch(removeRecipeKeywords(e))}
            onCheckedValue={(e) => dispatch(addRecipeKeyword(e))}
            onUncheckedValue={(e) => dispatch(removeRecipeKeyword(e))}
        />
    );
}

function Keywords() {
    const error = useSelector((state) => state.recipeFormular.error.keywords);

    return (
        <div>
            {error ? (
                <Box
                    sx={{
                        paddingBottom: '10px',
                        position: 'sticky',
                        top: 'calc(55px + 78px + 34px)',
                        background: (theme) => theme.palette.background.default,
                        zIndex: 2,
                    }}
                >
                    <Alert
                        error
                        message={
                            'Gib mindestens drei Kategorien bzw. Schlagworte an. Diese helfen dabei dein Rezept besser kategorisieren zu können und es dadurch schneller zu finden.'
                        }
                    />
                </Box>
            ) : null}

            <KeywordCategories />

            <Keyword label={'als Basis-Rezept geeignet'} value={'Basic'} />
            <Keyword label={'für Kleinkinder geeignet'} value={'Baby'} />

            <IndividualKeywords />
        </div>
    );
}

export default Keywords;
