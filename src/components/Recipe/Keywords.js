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
        <Chip
            sx={{
                marginTop: '4.4px',
                marginRight: '5px',
                height: '19px',
                marginBottom: '-2px',
                cursor: 'pointer',
                background: (theme) => theme.palette.primary.light,
                color: (theme) =>
                    theme.palette.getContrastText(theme.palette.primary.light),
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
    );
}

function Keywords() {
    const navigate = useNavigate();
    const keywords = useSelector((state) => state.recipe.keywords);
    const user = useSelector((state) => state.recipe.user);

    return (
        <div
            style={{ marginTop: '-2.6px', marginBottom: 'calc(24px + 2.6px)' }}
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
            <Tag
                label={user}
                onClick={() => navigate(`/rezepte?autor=${user}`)}
            />
        </div>
    );
}

export default Keywords;
