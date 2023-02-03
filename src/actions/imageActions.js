import { SET_IMAGES } from './types';

import { snackbarMessage } from './messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from './progressActions';

import api from '../axiosInstance';

export const getImages = () => (dispatch) => {
    dispatch(setProgress('images'));
    const config = {
        method: 'GET',
        url: '/recipe/image',
        success: (res) => {
            dispatch({
                type: SET_IMAGES,
                payload: res.data,
            });
            dispatch(setProgressSuccess('images'));
        },
        error: (err) => {
            console.error(err.message);
            dispatch(setProgressError('images'));
        },
    };

    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const deleteImage = (id) => (dispatch, getState) => {
    dispatch(setProgress(`image-${id}`));
    const config = {
        method: 'DELETE',
        url: `/recipe/image/${id}`,
        success: (res) => {
            dispatch({
                type: SET_IMAGES,
                payload: getState().image.images.filter(
                    (img) => img._id !== id
                ),
            });
            dispatch(
                snackbarMessage(
                    'Dein Bilder-Rezept wurde erfolgreich gelöscht.',
                    `image-${id}`
                )
            );
            dispatch(setProgressSuccess(`image-${id}`));
        },
        error: (err) => {
            console.error(err.message);
            dispatch(setProgressError(`image-${id}`));
        },
    };

    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};
