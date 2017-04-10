// ./src/components/MainImageWrapper.jsx

import React, { Component } from 'react';

class MainImageWrapper extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

        // Grab ref callbacks and make them avail for filtering
        let canvasRef = this.canvas;
        let selectedImageRef = this.selectedImage;
        this.props.setRefsCallback(canvasRef, selectedImageRef);


        // Drills
        
        var animals = /(pig|cow|chicken)+s?/g
        console.log(animals.exec("12 pigs pigs cow cow chicken pig cow"))
        
    }


    render(){

        return (
            <div className="col-sm-8 col-xs-12">
                <div className="selected-image">
                    <div id={"ff"+this.props.selectedImage.id}>
                        <h6>{this.props.selectedImage.title}</h6>
                        <div className="outer-image-wrapper">
                            {this.props.textModeBtn}
                            <div className="image-wrapper">
                                {this.props.textBox}
                                {this.props.dataImage}
                                <canvas ref={canvas => { this.canvas = canvas}} id="image-filter" width={this.props.hwVal.width} height={this.props.hwVal.height}></canvas>
                                <img ref={selectedImage => {this.selectedImage = selectedImage}} src={this.props.selectedImage.mediaUrl} 
                                width={this.props.hwVal.width} height={this.props.hwVal.height} alt={this.props.selectedImage.title} crossOrigin="anonymous"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MainImageWrapper
