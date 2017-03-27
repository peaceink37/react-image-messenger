// ./src/components/ImagePage.js

import React, { PropTypes, Component } from 'react';
import ImageFilter from './ImageFilter';
import GradientImageFilter from './GradientFilter';
import ThumbsContainer from './ThumbsContainer';
import BubbleMachine from './BubblesMachine';
import TextEntryBox from './TextEntryBox';
 

// First, we extract images, onHandleSelectImage, and selectedImage from 
// props using ES6 destructuring assignment and then render.
class ImagePage extends Component {


    constructor(props){
        super(props);
        
        this.handleTextMode = this.handleTextMode.bind(this);
        this.applyText = this.applyText.bind(this);
        this.attachCanvasToSettings = this.attachCanvasToSettings.bind(this);
        this.getTextBoxes = this.getTextBoxes.bind(this);
        this.counter = 0;
        this.textObject = {type:"TEXT", value:[{},{}]}
        this.state = {textMode:false, 
            gradientSettings:[{rChan:0,gChan:0,bChan:0,aChan:0.2,stop:0.2},
            {rChan:0,gChan:0,bChan:0,aChan:0.3,stop:0.4},{rChan:0,gChan:0,bChan:0,aChan:0.5,stop:0.7},
            {rChan:0,gChan:0,bChan:0,aChan:0.68,stop:0.8},{rChan:0,gChan:0,bChan:0,aChan:0.8,stop:1.0}]};
    }

    attachCanvasToSettings(obj, colorSetting){

        obj.canvas = this.refs.canvas;
        obj.img = this.refs.selectedimage;
        obj.redraw = false;
        obj.clear = false;

        if(obj.type === "GRADIENT"){
            this.setState({gradientSettings:colorSetting});
            if(this.state.textMode === true){
                return true;
            }
            obj.value.gradientSettings = this.state.gradientSettings;
        } else if (obj.type === "TEXT"){
            console.log(" now we're getting somewhere "+obj.value[0].value);
            this.props.setTextValues(obj);
            return true;
        }
        
        
        this.props.applyImageFilter(obj);

    }

    applyText(values){

        console.log(" values "+values.position+"  text values "+values.value+"  count val "+this.counter);
        if(values.position.indexOf("top") !== -1){
            this.textObject.value[0] = values;
        } else {
            this.textObject.value[1] = values;
        }

        if(this.counter === 1){
            this.attachCanvasToSettings(this.textObject);
            this.counter = 0;
        } else {
            this.counter++;    
        }
    }

    getTextBoxes(){

        return  <div>
                    <TextEntryBox 
                        classVal="top-text" applyText={this.applyText} 
                        textColor={this.state.gradientSettings} />
                    <TextEntryBox 
                        classVal="bottom-text" applyText={this.applyText} 
                        textColor={this.state.gradientSettings} />
                </div>
    }

   
    handleTextMode(evt){

        let val = this.state.textMode;
        
        val === false ? val = true : val = false;

        this.setState({textMode:val});
                
        if(val === false){
            let obj = {
                from:"TEXT",
                to:"FEATURES",
                modalOpen:true
            }
            this.props.toggleFeaturesModal(obj);
        } else {
            
            
        }

    }

    
    render(){

        let currentTheme = null;
            if(this.props.currentTheme !== "DetroitB"){
                currentTheme = <h2> Current Theme : <span>{this.props.currentTheme}</span></h2>
            } else {
                currentTheme = <div className="theme-text-placeholder"></div>
            }

        let bubbleMachine = null;
            if(this.props.bubbleMachine === true){
                bubbleMachine = <BubbleMachine />
            } else {
                bubbleMachine = <div></div>
            }

        let textBox = null;
            if(this.state.textMode === true){
                textBox = this.getTextBoxes();
            }
        
        let filterCollectionClasses = "col-sm-4 col-xs-12 filter-collection";
        let hwVal = {height:420, width:600};
                        
            if(this.props.winWidth < 767){
                filterCollectionClasses = "filter-collection-absolute filter-collection";
                hwVal.height = 480;
                hwVal.width = 640;
                if(this.props.filtersIn === true){
                    filterCollectionClasses = "filter-collection-absolute transition-in filter-collection";
                }
            }

         let dataImage = null;
            if(this.props.dataImage === true){
                dataImage = <img ref="dataimage" className="data-image" src={this.props.imageData} width={hwVal.width} height={hwVal.height} />
            }

        let textModeBtn = <button 
                            className="k-btn k-btn-default k-btn-abs"
                            onClick={this.handleTextMode}
                            >
                            <span className="text-icon text-icon-white"></span>
                            
                        </button>
            if(this.state.textMode === true){
                textModeBtn = <button 
                            className="k-btn k-btn-default k-btn-abs"
                            onClick={this.handleTextMode}
                            >
                            <span className="camera-icon"><i className="fa fa-camera" aria-hidden="true"></i></span>
                        </button>
            }


        return (
        <div>

        <div className="row"> 
            <div className="col-sm-12 middle-content-container">
                {currentTheme}
                <div className="image-filter-container">
                    <div className="col-sm-8 col-xs-12">
                        <div className="selected-image">
                            <div id={"ff"+this.props.selectedImage.id}>
                                <h6>{this.props.selectedImage.title}</h6>
                                <div className="outer-image-wrapper">
                                    {textModeBtn}
                                    <div className="image-wrapper">
                                        {textBox}
                                        {dataImage}
                                        <canvas ref="canvas" id="image-filter" width={hwVal.width} height={hwVal.height}></canvas>
                                        <img ref="selectedimage" src={this.props.selectedImage.mediaUrl} 
                                        width={hwVal.width} height={hwVal.height} alt={this.props.selectedImage.title} crossOrigin="anonymous"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={filterCollectionClasses}>
                        <ImageFilter 
                            id="k-contrastf" 
                            filterlabel="CONTRAST"
                            applyFilter={this.attachCanvasToSettings}
                            />
                        <ImageFilter 
                            id="k-brightnessf" 
                            filterlabel="BRIGHTNESS"
                            applyFilter={this.attachCanvasToSettings}
                            />
                        <GradientImageFilter
                            id="k-gradient"
                            filterlabel="GRADIENT"
                            gradientSettings={this.state.gradientSettings}
                            applyFilter={this.attachCanvasToSettings}
                            />
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            {bubbleMachine}
            <div className="col-sm-12">
                <ThumbsContainer 
                    thumbimages={this.props.images}
                    onHandleSelectedImage={this.props.onHandleSelectImage}

                    />
            </div>
        </div>
        </div>
        )
    }
};

// Define PropTypes
ImagePage.propTypes = {
  images: PropTypes.array.isRequired,
  selectedImage: PropTypes.object,
  onHandleSelectImage: PropTypes.func.isRequired
};

export default ImagePage;