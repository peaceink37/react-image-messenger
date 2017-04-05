// ./src/reducers/index.js

import { combineReducers } from 'redux';
import { imageReducer as images } from './kReducers';
import { filtersReducer as filters } from './kReducers';
import { uploadStateReducer as uploads } from './kReducers';
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    images,
    filters,
    uploads   
});

export default rootReducer;