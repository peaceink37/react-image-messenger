// ./src/containers/App.jsx

import React, { Component, PropTypes } from 'react';
import '../scss/main.scss';
import 'font-awesome-sass-loader';
import ImageUploadPage from './ImageUploadPage';
import MediaGalleryPage from './MediaGalleryPage';
// The parent component renders the Header component and component(s) in the
// route the user navigates to.

class App extends Component {

    constructor(props){
        super(props);
        
    }
  
    render() {    
               
        return (

            <div className="container-fluid text-center">
                <ImageUploadPage />
                <MediaGalleryPage />
             </div>
        );
    }
}

export default App;