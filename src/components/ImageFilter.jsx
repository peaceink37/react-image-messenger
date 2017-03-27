// ./mediagallery/src/components/ContrastFilter.jsx

import React, {PropTypes, Component} from 'react';
import FilterSlider from './FilterSlider';

class ImageFilter extends Component{


        constructor(props){
            super(props);
            this.setFilterValue = this.setFilterValue.bind(this);
            this.filterTouched = this.filterTouched.bind(this);
            this.state = {mouseDown:false, xPos:0, yPos:53, yPosAdj:53};
        }


        setFilterValue(value){


        }

        filterTouched(event){

            //setInterval(function(){


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
            
            this.setState({yPos:yPos, yPosAdj:calcYPos(adjYPos)});
            this.props.applyFilter({type:this.props.filterlabel, value:yPos});




            //},66)

            
        }



        render(){


            return(
                <div className="filter-control">
                    <h6>{this.props.filterlabel}</h6>
                    <FilterSlider 
                        touchEvent={this.filterTouched} 
                        ypos={this.state.yPosAdj}
                    />
                </div>

            )
        
        }

}

export default ImageFilter;