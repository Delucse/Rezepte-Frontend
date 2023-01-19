import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setAuthor } from '../../actions/recipeFilterActions';

import Textfield from '../Textfield';

import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

function Author(props) {
    const dispatch = useDispatch();

    const reduxAuthor = useSelector((state) => state.recipeFilter.author);
    const open = useSelector((state) => state.recipeFilter.open);

    const [author, setAuthorState] = useState(reduxAuthor);

    const onChangeAuthor = (e) => {
        setAuthorState(e.target.value);
    };

    const onChangeAuthorRedux = (e) => {
        dispatch(setAuthor(e.target.value));
    };

    useEffect(() => {
        if (open) {
            setAuthorState(reduxAuthor);
        } else {
            dispatch(setAuthor(author));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <Textfield
            style={{ marginBottom: '24px' }}
            value={props.redux ? reduxAuthor : author}
            onChange={props.redux ? onChangeAuthorRedux : onChangeAuthor}
            label="Autor"
            start={<Icon path={mdiAccount} size={1} />}
        />
    );
}

export default Author;
