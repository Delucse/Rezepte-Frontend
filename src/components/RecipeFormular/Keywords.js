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

import {
    Box,
    Checkbox,
    FormControlLabel,
    Divider,
    Typography,
    Chip,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';

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
        state.recipeFormular.keywords.some((key) =>
            new RegExp(`^${value}$`, 'i').test(key)
        )
    );
    const error = useSelector(
        (state) => state.recipeFormular.error.keywords && !checked
    );

    const handleChange = (event) => {
        if (event.target.checked) {
            dispatch(addRecipeKeyword(event.target.value));
        } else {
            dispatch(removeRecipeKeyword(event.target.value));
        }
    };

    return (
        <div>
            <FormControlLabel
                label={label}
                sx={{ color: (theme) => theme.palette.text.primary }}
                control={
                    <Checkbox
                        sx={
                            error
                                ? { color: (theme) => theme.palette.error.main }
                                : {}
                        }
                        value={value}
                        checked={checked}
                        onChange={handleChange}
                        disableRipple
                    />
                }
            />
        </div>
    );
}

function Category({ title, tags }) {
    const dispatch = useDispatch();

    const keywords = useSelector((state) =>
        state.recipeFormular.keywords.filter((key) =>
            tags.some((t) => new RegExp(`^${key}$`, 'i').test(t))
        )
    );
    const error = useSelector(
        (state) => state.recipeFormular.error.keywords && keywords.length === 0
    );

    const handleChange = (event) => {
        if (event.target.checked) {
            dispatch(addRecipeKeywords(tags));
        } else {
            dispatch(removeRecipeKeywords(tags));
        }
    };

    return (
        <Box sx={{ marginBottom: '24px' }}>
            <FormControlLabel
                label={title}
                sx={{ color: (theme) => theme.palette.text.primary }}
                control={
                    <Checkbox
                        sx={
                            error
                                ? { color: (theme) => theme.palette.error.main }
                                : {}
                        }
                        checked={keywords.length === tags.length}
                        indeterminate={
                            keywords.length > 0 &&
                            keywords.length !== tags.length
                        }
                        onChange={handleChange}
                        disableRipple
                    />
                }
            />
            <Divider
                sx={{
                    borderBottomWidth: 'small',
                    borderColor: (theme) => theme.palette.primary.light,
                }}
            />
            <Box sx={{ marginLeft: '20px' }}>
                {tags.map((word, index) => (
                    <Keyword label={word} value={word} key={index} />
                ))}
            </Box>
        </Box>
    );
}

function IndividualKeywords() {
    const [keyword, setKeyword] = useState('');

    const dispatch = useDispatch();
    const keywords = useSelector((state) =>
        state.recipeFormular.keywords.filter(
            (word) =>
                !paramKeywords.some((w) => new RegExp(`^${word}$`, 'i').test(w))
        )
    );
    const error = useSelector((state) => state.recipeFormular.error.keywords);

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const addKeyword = () => {
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

            <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
                {Object.entries(params.filter).map(([key, value]) => (
                    <Category title={key} tags={value} />
                ))}
            </Masonry>

            <Keyword label={'als Basis-Rezept geeignet'} value={'Basic'} />
            <Keyword label={'für Kleinkinder geeignet'} value={'Baby'} />

            <IndividualKeywords />
        </div>
    );
}

export default Keywords;
