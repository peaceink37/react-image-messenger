// ./src/routes.js

import React from 'react'; 
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import MediaGalleryPage from './containers/MediaGalleryPage';

// Map components to different routes.
// The parent component wraps other components and thus serves as  the entrance to 
// other React components.
let loc = window.location.href;
let base = "/"
if(loc.indexOf("filters") !== -1){
    base = "/kimgfilters"
}

export default (
    
  <Route path={base} component={App}> 
    <IndexRoute component={MediaGalleryPage} />
    <Route path={base+"/imagepage"} component={MediaGalleryPage} />
  < /Route>
  

);