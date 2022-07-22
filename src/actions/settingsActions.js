import { SET_COLOR } from '../actions/types';

import { snackbarMessage } from './messageActions';

export const setColors = (colors) => (dispatch) => {
    dispatch({
        type: SET_COLOR,
        payload: colors,
    });
    dispatch(
        snackbarMessage(
            `Das neue Farbschema wurde erfolgreich übernommen.`,
            colors
        )
    );
};
