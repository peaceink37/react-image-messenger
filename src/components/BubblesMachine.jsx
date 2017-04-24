// ./src/components/BubblesMachine.jsx

import React, {Component } from 'react';
import BubbleBuilder from '../services/bubbleBuilder';


class BubblesMachine extends Component {

  
    componentDidMount(){

        let canvas = this.canvas;
        let bubbles = BubbleBuilder();
        console.log(" canvas view "+canvas);
        let ctx = canvas.getContext("2d");

        let makeBubbles = () =>{
            bubbles.Draw(ctx,canvas);
            window.requestAnimationFrame(makeBubbles);
        }
        
        window.requestAnimationFrame(makeBubbles);
         

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