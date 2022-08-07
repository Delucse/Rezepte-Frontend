import { SET_IMAGES } from '../actions/types';

const initialState = {
    images: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGES:
            return {
                ...state,
                images: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
