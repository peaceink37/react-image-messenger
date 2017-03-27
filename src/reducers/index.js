// ./src/reducers/index.js

import { combineReducers } from 'redux';
import {imageReducer as images} from './imageReducers';
import {filteredimagereducer as filteredimage} from './imageReducers';
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    images
       
});

export default rootReducer;