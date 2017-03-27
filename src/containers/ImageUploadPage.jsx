import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postImageAction } from '../actions/mediaActions';
import { ProcessImage } from '../services/imageResize';
import { IsUploadSupported } from '../services/helperFunctions';
import { CalcPhi } from '../services/helperFunctions';

class ImageUploadPage extends Component {

    constructor(props){
        super(props);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.commenceUpload = this.commenceUpload.bind(this);
        this.cancelUpload = this.cancelUpload.bind(this);
        this.uploeadWidgetAppears = this.uploadWidgetAppears.bind(this);
        this.state = {topVal:-1222};

    }

    componentWillReceiveProps(){
        // Render different views for drag n drop, laptop, and mobile devices;
        console.log(" will receive called "+this.props.uploadImage);
        let timeout = setTimeout(() =>{
            if(this.props.uploadImage === true){
                this.uploadWidgetAppears();    
            }
        },100);
        

    }

    handleUploadImage(selectedImage) {
        this.props.dispatch(postImageAction(selectedImage));
    }

    uploadWidgetAppears(){
        console.log(" commence called "+this.props.uploadImage);
        this.setState({topVal:0});

    }
    commenceUpload(){
        
        let imgU = this.imageFile.files[0];
        let imgData = null;
        let imgType = null;

        let pushFile = (processedImg) => {
            
            this.handleUploadImage({data:processedImg, type:imgType, title:"get some pictures man"});
        };

        let readFile = (img) => {

            let reader = new window.FileReader();
                       
            reader.onloadend = () => {
                imgData = reader.result;
                imgType = img.type;
                ProcessImage(imgData, imgType, pushFile);
                
            }
            reader.onerror = () => {
                console.error(" UNABLE TO READ SELECTED FILE ");
            }
            reader.readAsDataURL(img);
        }

        readFile(imgU);
    }

    cancelUpload(evt){
        console.log(" evt target  "+evt.target.getAttribute('class'));
        let classToTest = evt.target.getAttribute('class') || "burn-it-down";
        evt.stopPropagation();
        if(classToTest.indexOf('outer-upload') !== -1){
            this.setState({topVal:-1222});
            return true;    
        } else {
            return false;
        }
        
    }


    render(){
        // First, find out if upload is supported
        let uploadVerdict = IsUploadSupported();
       

        let imageHolder =   <div id="image-holder" className="img-holder">
                                <input id="uploadfile" className="inputfile" name="uploadfile" ref={input => this.imageFile = input} type="file" accept="image/*" />
                                <label htmlFor="uploadfile">Choose a file</label>
                            </div>

        return(
            <div className="outer-upload-container" onClick={this.cancelUpload} style={{top:this.state.topVal}}>
                <div className="inner-upload-container">
                    {imageHolder}
                    <button 
                        type="submit"
                        className="k-btn"
                        onClick={this.commenceUpload}
                    >Upload</button>
                </div>
            </div>
        
        )
    }


}

export default connect(null, null)(ImageUploadPage);
