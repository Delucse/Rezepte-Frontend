import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipeNote, setRecipeNote } from '../../actions/recipeActions';

import PaperClip from '../PaperClip';
import Button from '../Button';
import Dialog from '../Dialog';
import Textfield from '../Textfield';
import IconButton from '../IconButton';

import { Backdrop, Box, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiDelete, mdiPencil, mdiNoteEditOutline } from '@mdi/js';

const Editor = ({ confirm }) => {
    const dispatch = useDispatch();
    const note = useSelector((state) => state.recipe.note);

    const [open, setOpen] = useState(false);
    const [text, setText] = useState(note);

    useEffect(() => {
        setText(note);
    }, [open, note]);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {note ? (
                <IconButton
                    tooltipProps={{
                        title: `Notiz ${
                            note.length > 0 ? 'ändern' : 'hinzufügen'
                        }`,
                        placement: 'right',
                    }}
                    sx={{
                        width: '21.4px',
                        height: '21.4px',
                        marginRight: '8px',
                        border: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                        color: (theme) => theme.palette.primary.main,
                        '&:hover': {
                            border: (theme) =>
                                `1px solid ${theme.palette.action.hover}`,
                            color: (theme) => theme.palette.action.hover,
                        },
                    }}
                    onClick={toggle}
                >
                    <Icon path={mdiPencil} size={0.7} />
                </IconButton>
            ) : (
                <Box
                    onClick={toggle}
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        cursor: 'pointer',
                        display: 'flex',
                        '&:hover': { textDecoration: 'underline' },
                        lineHeight: '24px',
                    }}
                >
                    <Icon
                        path={mdiNoteEditOutline}
                        size={'19px'}
                        style={{
                            marginTop: '3px',
                            marginRight: '3px',
                            marginLeft: '8px',
                            minHeight: '19px',
                        }}
                    />
                    Notiz
                </Box>
            )}
            <Dialog
                open={open}
                onClose={toggle}
                closeIcon
                fullWidth
                title={`Notiz ${note.length > 0 ? 'ändern' : 'hinzufügen'}`}
                content={
                    <Box sx={{ paddingTop: '5px' }}>
                        <Textfield
                            autoFocus
                            multiline
                            minRows={3}
                            value={text}
                            label="Notiz"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Box>
                }
                actions={
                    <div>
                        <Button
                            variant="outlined"
                            onClick={toggle}
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch(setRecipeNote(text));
                                toggle();
                                confirm();
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            disabled={text.trim() === ''}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </>
    );
};

const Delete = ({ confirm }) => {
    const dispatch = useDispatch();
    const title = useSelector((state) => state.recipe.title);

    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const cancel = () => {
        setText('');
        setOpen(false);
    };

    return (
        <>
            <IconButton
                tooltipProps={{
                    title: 'Notiz löschen',
                    placement: 'right',
                }}
                sx={{
                    width: '23px',
                    height: '23px',
                    border: (theme) => `1px solid ${theme.palette.error.main}`,
                    color: (theme) => theme.palette.error.main,
                    '&:hover': {
                        border: (theme) =>
                            `1px solid ${theme.palette.error.light}`,
                        color: (theme) => theme.palette.error.light,
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <Icon path={mdiDelete} size={0.7} />
            </IconButton>
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                fullWidth
                title={`Notiz löschen`}
                noPadding
                content={
                    <Box>
                        <Typography sx={{ marginBottom: '10px' }}>
                            Gib als Bestätigung den Rezepttitel an, um die Notiz
                            zu{' '}
                            <div
                                style={{ fontWeight: 700, display: 'contents' }}
                            >
                                {title}
                            </div>{' '}
                            endgültig zu löschen.
                        </Typography>
                        <Textfield
                            value={text}
                            label="Rezepttitel"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Box>
                }
                actions={
                    <div>
                        <Button
                            variant="outlined"
                            onClick={cancel}
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch(deleteRecipeNote());
                                setOpen(false);
                                confirm();
                            }}
                            disabled={title !== text}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </>
    );
};

const Notes = () => {
    const [open, setOpen] = useState(false);

    const note = useSelector((state) => state.recipe.note);

    const toggle = () => {
        setOpen(!open);
    };

    return note.length > 0 ? (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 10,
            }}
        >
            <div onClick={note.length > 0 ? toggle : () => {}}>
                <PaperClip
                    style={{
                        cursor: note.length > 0 ? 'pointer' : 'default',
                        top: -15,
                        left: { xs: 40, sm: 70, md: 100 },
                        transition: 'transform 1s',
                        transform: `rotate(${open ? 3 : 15}deg)`,
                        zIndex: (theme) => theme.zIndex.appBar - 30 + 1,
                    }}
                />
            </div>
            <Box
                onClick={!open ? toggle : null}
                sx={{
                    cursor: open ? 'default' : 'pointer',
                    zIndex: (theme) => theme.zIndex.appBar - 30,
                    transition: 'all 1s ease-in-out',
                    transform: `rotate(${open ? 3 : 15}deg)`,
                    width: open
                        ? '200px'
                        : { xs: '70px', sm: '120px', md: '180px' },
                    maxHeight: open ? '999px' : '24px',
                    position: 'relative',
                    background: (theme) => theme.palette.primary.light,
                    overflow: 'hidden',
                    padding: '30px 10px 25px 10px',
                    borderRadius: '0 0 0 30px/45px',
                    boxShadow: `inset 0 -40px 40px rgba(0,0,0,0.05),
                   inset 0 25px 10px rgba(0,0,0,0.05),
                   0 5px 6px 5px rgba(0,0,0,0.05)`,
                    // fontFamily: "'Permanent Marker', cursive",
                    lineHeight: '24px',
                    fontSize: '.9rem',
                    // fontFamily: 'Lucida Handwriting',
                    color: (theme) => theme.palette.text.primary,

                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        width: '20px',
                        height: '25px',
                        background: (theme) => theme.palette.primary.light,
                        boxShadow: `3px -2px 10px rgba(0,0,0,0.5),
                   inset 15px -15px 15px rgba(0,0,0,0.05)`,
                        left: 0,
                        bottom: 0,
                        zIndex: 2,
                        transform: 'skewX(25deg)',
                    },
                }}
            >
                <Box
                    sx={{
                        overflow: 'hidden',
                        whiteSpace: open ? 'unset' : 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {note}
                </Box>
                {open ? (
                    <Box
                        sx={{
                            display: 'flex',
                            marginTop: '10px',
                            float: 'right',
                        }}
                    >
                        <Editor confirm={() => setOpen(true)} isOpen={open} />
                        <Delete confirm={() => setOpen(false)} />
                    </Box>
                ) : (
                    <Box sx={{ visibility: 'hidden' }}>{note}</Box>
                )}
            </Box>
            <Backdrop
                sx={{
                    backgroundColor: 'transparent',
                    zIndex: (theme) => theme.zIndex.appBar - 40,
                }}
                open={open}
                onClick={toggle}
            ></Backdrop>
        </div>
    ) : (
        <Box sx={{ display: 'flex', marginLeft: '8px' }}>
            |<Editor confirm={() => setOpen(true)} isOpen={open} />
        </Box>
    );
};

export default Notes;
