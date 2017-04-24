// ./mediagallery/src/components/ContrastFilter.jsx

import React, {PropTypes, Component} from 'react';
import FilterSlider from './FilterSlider';
import { CalcAdjYPos } from '../services/helperFunctions';

class ImageFilter extends Component{


        constructor(props){
            super(props);
            this.filterTouched = this.filterTouched.bind(this);
            this.state = {mouseDown:false, xPos:0, yPos:this.props.startingY, yPosAdj:this.props.startingY};
            this.maxTop = null;
            this.minBottom = null;
            this.calcYPos = null;
        
        }

        componentWillMount(){

            this.targetHeight = null;
            this.topBoundary = null;

        }


        filterTouched(event){

            event.stopPropagation();
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
                       
            this.setState({yPos:yPos, yPosAdj:this.calcYPos(yPos)});
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