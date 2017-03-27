// ./mediagallery/src/components/ContrastFilter.jsx

import React, {PropTypes, Component} from 'react';
import FilterSlider from './FilterSlider';
import { RangeMap } from '../services/helperFunctions';

class GradientFilter extends Component{


        constructor(props){
            super(props);
            this.filterTouched = this.filterTouched.bind(this);
            this.state = {yPositions:{rYPos:106, gYPos:106, bYPos:106}};
            
        }

        filterTouched(event){

            
            let target = event.target;
            let yPos = parseInt(event.clientY) - parseInt(target.getBoundingClientRect().top);
            let filterSetting = ((yPos/120*(-100))+100).toFixed(0);
            
            let adjYPos = yPos;
            let calcYPos = (adjYPos) => {
           
                if (adjYPos > 106){
                    adjYPos = 106;
                } else if (adjYPos < 3){
                    adjYPos = 3;
                }
                
                return adjYPos;
            }

            let rangy = RangeMap(calcYPos(adjYPos));

            let num = Math.round(rangy(3, 111, 255, 0));

            let oldSetting = this.props.gradientSettings;
            let yPositions = this.state.yPositions;

            let newSetting = oldSetting.map((obj) => {

                switch(event.target.id){
                case "rchannel":
                    obj.rChan = num;
                    yPositions.rYPos = calcYPos(adjYPos);
                    return obj;
                case "gchannel":
                    obj.gChan = num;
                    yPositions.gYPos = calcYPos(adjYPos);
                    return obj;
                case "bchannel":
                    obj.bChan = num;
                    yPositions.bYPos = calcYPos(adjYPos);
                    return obj;
                default:
                    return obj;
                    console.log(" what you touching, man? "+event.target.id);

                }

            })

                       
            this.setState({yPositions});
            
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