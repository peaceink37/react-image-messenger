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
        this.setUploadedImage = this.setUploadedImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.state = {imageUploading:false, uploadImage:false, uploadedImage:{}}
    }

  
    setUploadedImage(img){

        this.setState({uploadedImage:img});
    }

    uploadImage(){
        
        let currentState = this.state;
        if(currentState.uploadImage === true){
            currentState.uploadImage = false;
        } else {
            currentState.uploadImage = true;
        }
        this.setState(currentState => {
                currentState.uploadImage;
                return currentState;
            }
        );
        console.log(" upload in app called "+this.state.uploadImage+"  current state upload "+currentState.uploadImage);
    }

    render() {
        
                
        return (

            <div className="container-fluid text-center">
                <ImageUploadPage 
                    uploadImage={this.state.uploadImage}
                />

                <MediaGalleryPage
                    uploadImage={this.uploadImage}
                    imageUploading={this.state.imageUploading}
                    uploadedImage={this.state.uploadedImage}
                />
                
            </div>
        );
    }
}
App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;