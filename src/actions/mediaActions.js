// ./src/actions/mediaActions.js

import * as types from '../constants/ActionTypes';

// Returns an action type and a payload - text, image, video, etc

export const selectImageAction = (image) => {
    return {
        type: types.SELECTED_IMAGE,
        image    
    }
};


export const searchMediaAction = (payload) => {
    console.log(" search fickr media called "+payload);
    return {
        type: types.SEARCH_MEDIA_REQUEST,
        payload
    }
};


export const setFilteredImage = (payload) => {

    return {
        type: types.SET_FILTERED_IMAGES,
        payload
    }
}

export const postImageAction = (imgObj) => {
    
    return {
        type: types.POST_IMAGE_REQUEST,
        image: imgObj
    }
}

