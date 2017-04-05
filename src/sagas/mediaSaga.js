// ./src/sagas/mediaSaga.js

import { put, call } from 'redux-saga/effects';
import { kbyteImages , postKImage } from '../api/api';
import * as types from '../constants/ActionTypes';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* searchMediaSaga({ payload }) {
    try {
        //console.log(" search media saga "+payload);
        
        const images = yield call(kbyteImages, payload);
    yield [
        //put({ type: types.FLICKR_IMAGES_SUCCESS, images }),
        put({ type: types.IMAGES_SUCCESS, images }),
        put({ type: types.SELECTED_IMAGE, image: images[0] })
        ];
    } catch (error) {
        yield put({ type: 'SEARCH_MEDIA_ERROR', error });
    }
}

export function* uploadImageSaga(payload){
    
    try {
        const uploadStatus = yield call(postKImage, payload.image);

        yield [
            put({type: types.POST_IMAGE_SUCCESS, image: uploadStatus}),
            put({type: types.ADD_POSTED_IMAGE_TO_ARRAY, image: uploadStatus})
        ];
    } catch (error) {
        yield put({type: types.POST_IMAGE_ERROR})
    }
}