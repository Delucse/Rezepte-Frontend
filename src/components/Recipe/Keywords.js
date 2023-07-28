import React from 'react';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Chip } from '@mui/material';

import params from '../../data/params.json';

var filterParams = [];
Object.keys(params.filter).forEach((key) => {
    filterParams = filterParams.concat(params.filter[key]);
});

function Tag({ label, onClick }) {
    return (
        <div style={{ height: '24px' }}>
            <Chip
                sx={{
                    marginRight: '5px',
                    height: '19px',
                    cursor: 'pointer',
                    background: (theme) => theme.palette.primary.light,
                    color: (theme) =>
                        theme.palette.getContrastText(
                            theme.palette.primary.light
                        ),
                    '&:hover': {
                        background: (theme) => theme.palette.primary.main,
                        color: (theme) =>
                            theme.palette.getContrastText(
                                theme.palette.primary.main
                            ),
                    },
                }}
                label={label}
                onClick={onClick}
            />
        </div>
    );
}

function Keywords() {
    const navigate = useNavigate();
    const keywords = useSelector((state) => state.recipe.keywords);

    return (
        <div
            style={{
                marginBottom: '24px',
                display: 'flex',
                flexFlow: 'wrap',
            }}
        >
            {keywords.map((keyword, index) => {
                return (
                    <Tag
                        key={index}
                        label={keyword}
                        onClick={() =>
                            keyword === 'Basic'
                                ? navigate('/rezepte/basis')
                                : keyword === 'Baby'
                                ? navigate('/rezepte/kleinkind')
                                : navigate(
                                      `/rezepte?${
                                          filterParams.includes(keyword)
                                              ? `filter=${keyword}`
                                              : `wort=${keyword}&typ=schlüsselwort`
                                      }`
                                  )
                        }
                    />
                );
            })}
        </div>
    );
}

export default Keywords;
