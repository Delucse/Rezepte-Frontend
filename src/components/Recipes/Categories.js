import React from 'react';

import Checkbox from '../Checkbox';

import { Box, Divider } from '@mui/material';
import { Masonry } from '@mui/lab';

import params from '../../data/params.json';

function Category({
    title,
    values,
    tags,
    error,
    onCheckedTitle,
    onUncheckedTitle,
    onCheckedValue,
    onUncheckedValue,
}) {
    values = values.filter((val) => tags.includes(val));

    return (
        <Box sx={{ marginBottom: '24px' }}>
            <Checkbox
                label={title}
                checked={values.length === tags.length}
                indeterminate={
                    values.length > 0 && values.length !== tags.length
                }
                error={error && values.length === 0}
                onChecked={() => onCheckedTitle(tags)}
                onUnchecked={() => onUncheckedTitle(tags)}
            />
            <Divider
                sx={{
                    borderBottomWidth: 'small',
                    borderColor: (theme) => theme.palette.primary.light,
                }}
            />
            <Box sx={{ marginLeft: '20px' }}>
                {tags.map((word, index) => {
                    const checked = values.some((tag) =>
                        new RegExp(`^${word}$`, 'i').test(tag)
                    );

                    return (
                        <Checkbox
                            key={index}
                            label={word}
                            value={word}
                            checked={checked}
                            error={error && !checked}
                            onChecked={onCheckedValue}
                            onUnchecked={onUncheckedValue}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}

function Categories({
    values,
    error,
    indeterminate,
    onCheckedTitle,
    onUncheckedTitle,
    onCheckedValue,
    onUncheckedValue,
}) {
    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
            {Object.entries(params.filter).map(([key, value]) => (
                <Category
                    key={key}
                    title={key}
                    values={values}
                    tags={value}
                    error={error}
                    indeterminate={indeterminate}
                    onCheckedTitle={onCheckedTitle}
                    onUncheckedTitle={onUncheckedTitle}
                    onCheckedValue={onCheckedValue}
                    onUncheckedValue={onUncheckedValue}
                />
            ))}
        </Masonry>
    );
}

export default Categories;
