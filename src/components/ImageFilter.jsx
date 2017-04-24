// ./mediagallery/src/components/ContrastFilter.jsx

import React, {PropTypes, Component} from 'react';
import FilterSlider from './FilterSlider';
import { CalcAdjYPos } from '../services/helperFunctions';

class ImageFilter extends Component{


        constructor(props){
            super(props);
            this.filterTouched = this.filterTouched.bind(this);
            this.state = {mouseDown:false, xPos:0, yPos:this.props.startingY, yPosAdj:this.props.startingY};
        }


        filterTouched(event){

            event.stopPropagation();
            let target = event.target;

            let topBoundary = parseInt(target.getBoundingClientRect().top);
            let targetHeight = parseInt(target.getBoundingClientRect().bottom) - topBoundary;
           
            let maxTop = targetHeight - this.props.borderBuffer[0];
            let minBottom = this.props.borderBuffer[1];
            let calcYPos = CalcAdjYPos(maxTop, minBottom);
            let yPos = parseInt(event.clientY) - topBoundary;
            let adjYPos = calcYPos(yPos);
            console.log(" ypos "+yPos+" client y "+parseInt(event.clientY)+" top boundary "+topBoundary);
            this.setState({yPos:yPos, yPosAdj:adjYPos});
            this.props.applyFilter({type:this.props.filterlabel, value:yPos});
            
        }



        render(){


            return(
                <div className="filter-control">
                    <h6>{this.props.filterlabel}</h6>
                    <FilterSlider 
                        touchEvent={this.filterTouched} 
                        ypos={this.state.yPosAdj}
                        id={this.props.id}
                    />
                </div>

            )
        
        }

}

export default ImageFilter;