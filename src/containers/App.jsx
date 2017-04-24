// ./src/containers/App.jsx

import React, { Component } from 'react';
import '../scss/main.scss';
import 'font-awesome-sass-loader';
import ImageUploadPage from './ImageUploadPage';
import MediaGalleryPage from './MediaGalleryPage';
//import ArtHouse from './ArtHouse';
//Main containers go here

class App extends Component {

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