import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postImageAction , uploadFinished } from '../actions/mediaActions';
import { ProcessImage } from '../services/imageResize';
import { IsUploadSupported } from '../services/helperFunctions';
import { CalcPhi } from '../services/helperFunctions';

class ImageUploadPage extends Component {

    constructor(props){
        super(props);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.commenceUpload = this.commenceUpload.bind(this);
        this.vanishUploadModal = this.vanishUploadModal.bind(this);
        this.uploeadWidgetAppears = this.uploadWidgetAppears.bind(this);
        this.state = {topVal:-1222};

    }

    componentWillReceiveProps(nextProps){
        // Render different views for drag n drop, laptop, and mobile devices;
        
        console.log(" old prop for upload status "+this.props.uploadImage+"  new prop for upload status  "+nextProps.uploadImage);
        if(nextProps.uploadImage === true){
            this.uploadWidgetAppears();
        }
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
        this.vanishUploadModal("_");

        readFile(imgU);
    }

    vanishUploadModal(evt){
        //console.log(" evt target  "+evt.target.getAttribute('class'));
        let vanishModal = () => {

            this.setState({topVal:-1222});
            
        }
        let classToTest = null;

        // an event target being undefined means this function was called
        // from the image uploading process
        if(typeof evt.target === 'undefined'){
            vanishModal();
            return true;
        } else {
            classToTest = evt.target.getAttribute('class') || "burn-it-down";
            evt.stopPropagation();
        }
        
        if(classToTest.indexOf('outer-upload') !== -1){
            vanishModal();
            this.props.dispatch(uploadFinished(false));
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
                                <button 
                                    type="submit"
                                    className="k-btn upload-modal-btn"
                                    onClick={this.commenceUpload}
                                >Upload</button>
                            </div>

        return(
            <div className="outer-upload-container" onClick={this.vanishUploadModal} style={{top:this.state.topVal}}>
                <div className="inner-upload-container">
                    {imageHolder}
                    
                </div>
            </div>
        
        )
    }


}
const mapStateToProps = ({uploads}) => ({
    uploadImage:uploads.uploadStatus
})

export default connect(mapStateToProps, null)(ImageUploadPage);
