import { SET_COLOR } from '../actions/types';

const initialState = {
    color: {
        main:
            localStorage.getItem('palette.primary.main') || 'rgb(11, 102, 35)',
        light:
            localStorage.getItem('palette.primary.light') ||
            'rgb(133, 179, 145)',
        mode: localStorage.getItem('palette.mode') || 'light',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLOR:
            localStorage.setItem('palette.primary.main', action.payload.main);
            localStorage.setItem('palette.primary.light', action.payload.light);
            localStorage.setItem('palette.mode', action.payload.mode);
            return {
                ...state,
                color: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
