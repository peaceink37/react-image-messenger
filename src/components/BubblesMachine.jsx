// ./src/components/BubblesMachine.jsx

import React, {Component, PropTypes} from 'react';
//import { findDOMNode } from "react-dom";
import BubbleBuilder from '../services/bubbleBuilder';


class BubblesMachine extends Component {

    constructor(props){
        super(props);
            
    }

    componentDidMount(){

        let canvas = this.canvas;
        let bubbles = BubbleBuilder();
        console.log(" canvas view "+canvas);
        let ctx = canvas.getContext("2d");
        
        
        setInterval(
            function(){bubbles.Draw(ctx,canvas)}, 44);
        bubbles.Draw(ctx,canvas);

    }

 
    render(){

         return (
            <div className="bubblemachine">
                <canvas ref={canvas => this.canvas = canvas} width="500" height="500"></canvas>
            </div>
        )

    }

};

export default BubblesMachine