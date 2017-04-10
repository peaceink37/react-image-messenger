// ./src/routes.js

import React from 'react'; 
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import MediaGalleryPage from './containers/MediaGalleryPage';
//import ArtHouse from './containers/ArtHouse';

// Map components to different routes.
// The parent component wraps other components and thus serves as  the entrance to 
// other React components.
export default (
  <Route path="/" component={App}> 
    <IndexRoute component={MediaGalleryPage} />
    <Route path="/imagepage" component={MediaGalleryPage} />
  </Route>
);