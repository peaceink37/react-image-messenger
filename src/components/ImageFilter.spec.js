// ./src/components/ImageFilter.spec.js

//jest.dontMock('./ImageFilter');

import React from 'react';
import renderer from 'react-test-renderer';
import ImageFilter from './ImageFilter';
import FilterSlider from './FilterSlider';

test(' Click / Touch event fires each time user clicks on filter', () => {

    
    //let props = {filterLabel:" Smile Kiddo "};
    let attachCanvasToSettings = (evt) => {

    }

    const component = renderer.create(
        <ImageFilter 
            id="k-brightnessf" 
            filterlabel="BRIGHTNESS"
            applyFilter={attachCanvasToSettings}
            startingY={53}
            borderBuffer={[14,3]}
            />
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onMouseDown();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

})

test(' CalcYPos should return y position of filter knob ', () => {

    let yPos = null;
    let maxTop = 100;
    let minBottom = 2;

    let calcYPos = (yPos) => {
       
                let adjYPos = yPos;

                if (adjYPos > maxTop){
                    adjYPos = maxTop;
                } else if (adjYPos < minBottom){
                    adjYPos = minBottom;
                }
                
                return adjYPos;
            }

    expect(calcYPos(111)).toEqual(100);
    expect(calcYPos(1)).toEqual(2);


})

test(' Regex variations', () => {

    // plus means one or more matches and * means zero or more
    console.log(/'\d+'/.test("'12312388123'"));
    // the ^ inverts sets of characters to match
    console.log(/[^0123]/.test("0121212333000"));
    console.log(/[^01]/.test("0121212345000"));

    // The ? makes a pattern optional (zero or one matches )
    console.log(/butth[ea]?d/.test("butthd"));
    console.log(/butth[ea]?d/.test("butthead"));

})








