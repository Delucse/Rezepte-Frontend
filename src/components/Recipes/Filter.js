import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, setOpen } from '../../actions/recipeFilterActions';

import Categories from './Categories';

import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';

import Icon from '@mdi/react';
import { mdiFilter } from '@mdi/js';

const drawerBleeding = 50;

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function Filter() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.recipeFilter.open);
    const recipes = useSelector((state) => state.recipeFilter.recipes);
    const categories = useSelector((state) => state.recipeFilter.categories);

    const toggle = () => {
        dispatch(setOpen(!open));
    };

    return (
        <div>
            <Button
                sx={{
                    margin: '0 5px',
                    height: '56px',
                    borderRadius: 0,
                    boxShadow: 'none',
                    minWidth: '56px',
                    padding: 0,
                    color: (theme) => theme.palette.background.default,
                }}
                variant="contained"
                disableRipple
                onClick={toggle}
            >
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={categories.length}
                    componentsProps={{
                        badge: {
                            sx: {
                                backgroundColor: (theme) =>
                                    theme.palette.background.default,
                                color: (theme) => theme.palette.primary.main,
                                minWidth: '15px',
                                height: '15px',
                                padding: '0 3px',
                                fontSize: '10px',
                            },
                        },
                    }}
                    max={9}
                >
                    <Icon path={mdiFilter} size={1.1} />
                </Badge>
            </Button>

            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(100% - 55px - 54px - 96px - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggle}
                onOpen={toggle}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{ zIndex: 1 }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        borderTop: (theme) =>
                            `1px solid ${theme.palette.primary.light}`,
                        height: `${drawerBleeding}px`,
                        background: (theme) => theme.palette.background.default,
                        backgroundImage:
                            'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
                    }}
                >
                    <Puller />
                    <Box sx={{ display: 'flex', paddingTop: '20px' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                padding: (theme) => `0 ${theme.spacing(3)}`,
                                color: 'text.secondary',
                            }}
                        >
                            {recipes
                                ? `${recipes.length} Rezept${
                                      recipes.length !== 1 ? 'e' : ''
                                  }`
                                : 'lädt ...'}
                        </Typography>
                        <Box
                            sx={{
                                pointerEvents: 'auto',
                                width: 'calc(100% - 130px)',
                                overflowY: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    overflowX: 'auto',
                                    overflowY: 'hidden',
                                    display: 'flex',
                                }}
                            >
                                {!open
                                    ? categories.map((category, index) => (
                                          <Chip
                                              key={index}
                                              label={category}
                                              onDelete={() =>
                                                  dispatch(
                                                      removeCategory(category)
                                                  )
                                              }
                                              color="primary"
                                              size="small"
                                              sx={{
                                                  marginRight: '5px',
                                                  marginBottom: '10px',
                                              }}
                                          />
                                      ))
                                    : null}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        padding: (theme) => `0 ${theme.spacing(3)}`,
                        overflow: 'auto',
                    }}
                >
                    <Categories />
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default Filter;
