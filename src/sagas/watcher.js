// ./src/sagas/watcher.js

import { takeLatest } from 'redux-saga';
import { searchMediaSaga, uploadImageSaga } from './mediaSaga';
import * as types from '../constants/ActionTypes';

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export function* watchSearchMedia() {
    yield* takeLatest(types.SEARCH_MEDIA_REQUEST, searchMediaSaga);
}

export function* watchPostImage() {
    yield* takeLatest(types.POST_IMAGE_REQUEST, uploadImageSaga);
}