// ./medialibrary/src/components/FilterSlider.jsx
// Generic slider component for filter image settings

import React from 'react';

const FilterSlider = (props) => {
      
    let idGen = 'f'+(Math.random()*1000).toFixed(0);
    
    return (
        <div className="filter-wrapper">
            <span onMouseDown={props.touchEvent} id={props.id || idGen} className="filter-slider-inset"></span>
            <span className="filter-light" style={{top:props.ypos + 'px'}}></span>
            <div onMouseDown={props.touchEvent} 
                    className="filter-slider">
            </div>
        </div>

    )

}

export default FilterSlider;
