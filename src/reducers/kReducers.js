// ./src/reducers/imageReducers.js

import initialState from './initialState';
import * as types from '../constants/ActionTypes';

// Handles image related actions

export const imageReducer = (state = initialState.images, action) => {
    
    switch (action.type) {
        case types.IMAGES_SUCCESS:
            return [...state, action.images];
        case types.SELECTED_IMAGE:
            return { ...state, selectedImage: action.image };
        case types.POST_IMAGE_SUCCESS:
            return { ...state, selectedImage: action.image };
        case types.ADD_POSTED_IMAGE_TO_ARRAY:
            let oldStateCopy = [...state["0"]].slice(0, state["0"].length - 1);
            return {...state, ["0"]: [action.image].concat(oldStateCopy)};
        default:
            return state;
    }
}


export const filtersReducer = (state = initialState.filters, action) => {

    switch (action.type) {
        case types.SET_IMAGE_COLOR_GRADIENT:
            return {...state, GRADIENT: action.filter };
        default:
            return state;
    }
    
}

export const uploadStateReducer = (state = initialState.uploads, action) => {

    switch (action.type) {
        case types.UPLOADING:
            console.log("  uploading  "+action.verdict)
            return {...state, uploadStatus: action.verdict}
        case types.UPLOAD_FINISHED:
            return {...state, uploadStatus: action.verdict}
        default:
            return state;
    }
}