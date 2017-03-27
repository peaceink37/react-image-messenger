import React, {Component} from 'react';

class TextEntryBox extends Component {


    constructor(props){
        super(props);
        this.handleTextFocus = this.handleTextFocus.bind(this);
        this.state = {shadowColor:{rChan:0, gChan:0, bChan:0}};
        
    }

  
    componentWillUnmount(){
        console.log(" an updated text component "+this.textArea.value);

        let textValue = {
            value:this.textArea.value || " ",
            color:this.props.textColor[0],
            position:this.props.classVal
        }
        this.props.applyText(textValue);
    }

   
    render(){

        if(typeof this.props.textColor === 'undefined'){
            return false;
        }

        let shadowColors = ()=>{
            let shadowArray = [this.props.textColor[0].rChan,this.props.textColor[0].gChan,this.props.textColor[0].bChan];
            let shadowVal = shadowArray.map((val)=>{
                let newVal = 255 - val;
                return newVal;
            }).reduce((acc,val)=>{
                return acc + val;
            })

            let greyScaleVal = Math.round(shadowVal/3)
            //console.log(" grayscale val "+greyScaleVal+"   "+shadowVal);

            let classVal = "text-box top-text-shadow-1";
            if(greyScaleVal > 71){
                classVal = "text-box top-text-shadow-4";
            } 
            return classVal;
        }


        return(
            
            <textarea   
                className={shadowColors()+' '+this.props.classVal} 
                onFocus={this.handleTextFocus} 
                tabIndex="1" 
                maxLength="155"
                ref={(textarea) => { this.textArea = textarea}}
                style={{color:'rgba('+this.props.textColor[0].rChan+','+this.props.textColor[0].gChan+
                ','+this.props.textColor[0].bChan+',1)'}}>
            </textarea>
            

            )
    }

}
//textShadow:'1px -1px 0 rgba('+shadowColors()+','+shadowColors()+','+shadowColors()+',1)'
export default TextEntryBox;