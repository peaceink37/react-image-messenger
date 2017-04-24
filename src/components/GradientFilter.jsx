// ./mediagallery/src/components/ContrastFilter.jsx

import React, {PropTypes, Component} from 'react';
import FilterSlider from './FilterSlider';
import { RangeMap , CalcAdjYPos } from '../services/helperFunctions';

class GradientFilter extends Component{


        constructor(props){
            super(props);
            this.filterTouched = this.filterTouched.bind(this);
            this.state = {yPositions:{rYPos:106, gYPos:106, bYPos:106}};
        }

        filterTouched(event){

            
            //event.stopPropagation();
            let target = event.target;

            let topBoundary = parseInt(target.getBoundingClientRect().top);
            let targetHeight = parseInt(target.getBoundingClientRect().bottom) - topBoundary;
            

            let maxTop = targetHeight - this.props.borderBuffer[0];
            let minBottom = this.props.borderBuffer[1];
            let calcYPos = CalcAdjYPos(maxTop, minBottom);
            
            
            let yPos = parseInt(event.clientY) - topBoundary;

            let adjYPos = calcYPos(yPos);
            let rangy = RangeMap(adjYPos);
            
            let num = Math.round(rangy(3, 111, 255, 0));

            console.log(" range num "+num+" yPos from clientY "+yPos);

            let oldSetting = this.props.gradientSettings;
            let yPositions = this.state.yPositions;
            let newSetting = oldSetting.map((obj) => {

                //console.log(" old setting map "+obj+" target id  "+target.id);
                switch(target.id){
                case "rchannel":
                    obj.rChan = num;
                    yPositions.rYPos = adjYPos;
                    //console.log(" r channel adjust "+yPositions.rYPos);
                    return obj;
                case "gchannel":
                    obj.gChan = num;
                    yPositions.gYPos = adjYPos;
                    return obj;
                case "bchannel":
                    obj.bChan = num;
                    yPositions.bYPos = adjYPos;
                    return obj;
                default:
                    return obj;
                    console.log(" what you touching, man? "+target.id);

                }

            })

                       
            this.setState({yPositions});

            console.log("  this.state.yPositions.rYPos  "+this.state.yPositions.rYPos);
            
            this.props.applyFilter({type:this.props.filterlabel, value:this.state}, newSetting);
        }



        render(){


            return(
                <div className="gradient-filter-container">
                    <div className="color-field" 
                        style={{backgroundColor:'rgba('+this.props.gradientSettings[0].rChan+','+this.props.gradientSettings[0].gChan+','+this.props.gradientSettings[0].bChan+',1)'}}>
                        
                    </div>
                    <div className="gradient-filter-control">
                        <div className="rgba-channel">
                            <h6>R</h6>
                            <FilterSlider
                                id="rchannel"
                                touchEvent={this.filterTouched} 
                                ypos={this.state.yPositions.rYPos}
                            />
                        </div>
                        <div className="rgba-channel">
                            <h6>G</h6>
                            <FilterSlider
                                id="gchannel" 
                                touchEvent={this.filterTouched} 
                                ypos={this.state.yPositions.gYPos}
                            />
                        </div>
                        <div className="rgba-channel">
                            <h6>B</h6>
                            <FilterSlider
                                id="bchannel" 
                                touchEvent={this.filterTouched} 
                                ypos={this.state.yPositions.bYPos}
                            />
                        </div>
                    </div>
                </div>

            )
        
        }

}

export default GradientFilter;