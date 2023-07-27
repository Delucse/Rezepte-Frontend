import React from 'react';

import IconButton from './IconButton';

import { Box } from '@mui/material';

import Icon from '@mdi/react';
import { mdiHelpCircleOutline } from '@mdi/js';

function Help({ explanation, formular }) {
    const size = 0.8;
    return (
        <Box
            sx={
                formular
                    ? {
                          display: 'contents',
                      }
                    : {
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: `calc(-2px * ${size})`,
                          marginLeft: '4px',
                      }
            }
        >
            <IconButton
                tooltipProps={{ title: explanation, controlled: true }}
                sx={
                    formular
                        ? {
                              marginTop: `calc(-5px * ${size})`,
                              marginLeft: '4px',
                              width: `calc(24px * ${size})`,
                              height: `calc(24px * ${size})`,
                              color: (theme) => theme.palette.primary.light,
                              '&:hover': {
                                  color: (theme) => theme.palette.primary.main,
                              },
                          }
                        : {
                              width: `calc(24px * ${size})`,
                              height: `calc(24px * ${size})`,
                              color: (theme) => theme.palette.primary.light,
                              '&:hover': {
                                  color: (theme) => theme.palette.primary.main,
                              },
                          }
                }
            >
                <Icon path={mdiHelpCircleOutline} size={size} />
            </IconButton>
        </Box>
    );
}

export default Help;
