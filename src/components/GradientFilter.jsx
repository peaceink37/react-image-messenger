// ./mediagallery/src/components/ContrastFilter.jsx

import React, {PropTypes, Component} from 'react';
import FilterSlider from './FilterSlider';
import { RangeMap , CalcAdjYPos } from '../services/helperFunctions';

class GradientFilter extends Component{


        constructor(props){
            super(props);
            this.filterTouched = this.filterTouched.bind(this);
            this.state = {yPositions:{rYPos:106, gYPos:106, bYPos:106}};
            this.maxTop = null;
            this.minBottom = null;
            this.calcYPos = null;
          
        }

        componentWillMount(){

            this.targetHeight = null;
            this.topBoundary = null;
        }

        filterTouched(event){

            
            //event.stopPropagation();
            let target = event.target;

            // we only want to run these measuring methods once
            if(this.targetHeight === null){
                this.topBoundary = parseInt(target.getBoundingClientRect().top);
                this.targetHeight = parseInt(target.getBoundingClientRect().bottom) - this.topBoundary;
                this.maxTop = this.targetHeight - this.props.borderBuffer[0];
                this.minBottom = this.props.borderBuffer[1];
                this.calcYPos = CalcAdjYPos(this.maxTop, this.minBottom);
            }

            
            
            let yPos = parseInt(event.clientY) - this.topBoundary;

            let rangy = RangeMap(this.calcYPos(yPos));
            console.log(" rangy "+this.calcYPos(yPos));
            let num = Math.round(rangy(3, 111, 255, 0));

            let oldSetting = this.props.gradientSettings;
            let yPositions = this.state.yPositions;
            console.log(" old setting "+oldSetting);
            let newSetting = oldSetting.map((obj) => {

                console.log(" old setting map "+obj+" target id  "+target.id);
                switch(target.id){
                case "rchannel":
                    obj.rChan = num;
                    yPositions.rYPos = this.calcYPos(yPos);
                    console.log(" r channel adjust "+yPositions.rYPos);
                    return obj;
                case "gchannel":
                    obj.gChan = num;
                    yPositions.gYPos = this.calcYPos(yPos);
                    return obj;
                case "bchannel":
                    obj.bChan = num;
                    yPositions.bYPos = this.calcYPos(yPos);
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