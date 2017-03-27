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
        default:
            return state;
    }
}


export const filteredImageReducer = (state = initialState.filteredimage, action) => {


    
}