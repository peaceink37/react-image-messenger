// ./src/services/imageFilters.js
// Filter set for images

import ColorMatrix from './colorMatrix';
import { RangeMap } from '../services/helperFunctions';
import FilterStore from '../services/filterStore';

const ImageFilters = (img, canvas) => {

    // helper methods here if one is so inclined
    const colorMatrix = ColorMatrix();
    
    let ctx = canvas.getContext('2d');
    let h = canvas.height;
    let w = canvas.width;
    ctx.drawImage(img, 0, 0, w, h);
    let options = {};

    let getRange = (setting) =>{

        let rangy = RangeMap(setting);
        let num = Math.round(rangy(3, 111, 100, -100));
        return num;

    }
   
    
    const filters = {

        clear:() => {
            ctx.clearRect(0, 0, w, h);
        },
        contrast:(setting) => {

            
            let imgData = ctx.getImageData(0,0,w,h);
            console.log(' image data '+imgData+'  setting '+setting);
            let num = getRange(setting);

            options.contrast = num;
            
            let contrastedImg = colorMatrix(imgData, options);
            filters.setImageData(contrastedImg,0 ,0);

            //return contrastedImg;

        },
        brightness:(setting) => {

            let num = getRange(setting);

            let imgData = ctx.getImageData(0,0,w,h);
            console.log(' image data '+imgData);
            options.brightness = num;
            let contrastedImg = colorMatrix(imgData, options);
            filters.setImageData(contrastedImg,0 ,0);
            //return contrastedImg;


        },
        
        gradient:(settingObj) => {
            //ColorMatrix, UIVisualConfigFactory
    
            let defaultFilter = function(filterObj, width, height){

                if(typeof filterObj === 'undefined'){
                    return;
                }
              
                let texture = document.createElement('canvas');
                let ctx2 = texture.getContext('2d');

                texture.width = width;
                texture.height = height;

                console.log(" passed into default filter "+filterObj+" "+width+" "+height);
                // Fill a Radial Gradient
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
                let gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);

                // stop ranges are between 0 and 1

                filterObj.gradientSettings.map((obj, i) => {

                    gradient.addColorStop(obj.stop, "rgba("+obj.rChan+","+obj.gChan+","+obj.bChan+","+obj.aChan+")");

                })

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);

                return texture;
            }

            let blend = function (background, foreground, width, height, transform) {
                var bottom = background.getImageData(0, 0, width, height);
                var top = foreground.getImageData(0, 0, width, height);

                for (var i = 0, size = top.data.length; i < size; i += 4) {
                    // red
                    top.data[i + 0] = transform(bottom.data[i + 0], top.data[i + 0]);
                    // green
                    top.data[i + 1] = transform(bottom.data[i + 1], top.data[i + 1]);
                    // blue
                    top.data[i + 2] = transform(bottom.data[i + 2], top.data[i + 2]);
                    // the fourth slot is alpha. We don't need that (so skip by 4)
                }

                return top;
            }

            let blendCanvas = defaultFilter(settingObj, w, h);
            ctx.drawImage(blendCanvas,0 ,0);
            
            FilterStore.GRADIENT.empty = false;
            FilterStore.GRADIENT.value = settingObj;
            //let blendedImgData = blend(ctx, blendCtx, w, h, function(bottomPixel, topPixel) {
            //    return 255 - (255 - topPixel) * (255 - bottomPixel) / 255;
            //});
            let imgData = ctx.getImageData(0,0,w,h);
            let bright = getRange(FilterStore.BRIGHTNESS.value || 15);
            let contrast = getRange(FilterStore.CONTRAST.value || 30);
            let contrastedImg = colorMatrix(imgData, {bright, contrast});
            console.log(" blended img data "+imgData+"  BRIGHT and CONTRAST   "+bright+"   "+contrast);
            //ctx.putImageData(contrastedImg, 0, 0);
            
            filters.setImageData(contrastedImg, 0, 0);
            
            
        },
        setImageData(imgData, x, y){

           
            ctx.putImageData(imgData, x, y);
            FilterStore.CANVAS.empty = false;
            FilterStore.CANVAS.value = canvas;    
        
            
        },
        // capture camera video still
        snapshot:function(ctx, source, top, left, width, height){
            ctx.drawImage(source, top, left, width, height);
                // "image/webp" works in Chrome.
                // Other browsers will fall back to image/png.
                //document.querySelector('img').src = canvas.toDataURL('image/webp');
            return ctx;
        },
        text:function(settingObj){
            /* Shape of text object 
                let textValue = {
                value:this.textArea.value,
                color:this.props.textColor,
                position:this.props.classVal
            }
            */

            function wrapText(context, text, x, y, maxWidth, lineHeight) {
                let words = text.split(' ');
                let line = '';

                for(let n = 0; n < words.length; n++) {
                    let testLine = line + words[n] + ' ';
                    let metrics = context.measureText(testLine);
                    let testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        context.fillText(line, x, y);
                        context.strokeText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, y);
                context.strokeText(line, x, y);
            }



            if(FilterStore.GRADIENT.empty === false){
                filters.gradient(FilterStore.GRADIENT.value);
            }

            console.log(" in text filters "+settingObj[0].color.rChan+"  text value "+settingObj[1]);
            // check if filters have been applied
            let colors = settingObj[0].color;

            ctx.font="700 36px Helvetica";
            ctx.textAlign="center";
            ctx.fillStyle = "rgba("+colors.rChan+","+colors.gChan+","+colors.bChan+",0.88)";
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(253,253,255,1)";

            wrapText(ctx, settingObj[0].value,(w/2), 40, (w-30), 32);
            
            //ctx.fillText(settingObj[0].value,(w/2), 40);
            //ctx.strokeText(settingObj[0].value,(w/2), 40);

            ctx.font="600 24px Helvetica";
            ctx.lineWidth = 1;
                         
            // apply top and bottom text
            wrapText(ctx, settingObj[1].value,(w/2),(h-40),(w-40), 26);
            FilterStore.CANVAS.empty = false;
            FilterStore.CANVAS.value = canvas;   
      

        }
    }

    return filters;

}


export default ImageFilters; 

