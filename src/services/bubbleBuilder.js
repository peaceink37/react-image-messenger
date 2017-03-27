// amimated bubble builder


const BubbleBuilder = () => {

    // A rightout bubble holder
    let e1 = [];
    let rechargeVal = 1;

    return {

        Draw:(ctx, canvas) =>{

            //console.log(' drawing ');

            let cw = canvas.width = window.innerWidth;
            let ch = canvas.height = window.innerHeight;
            let howMany = 35;
            let floatSpeed = 10;
            let rad = (Math.PI / 180);
            let kappa = 0.5522847498;
            let a = 3 * Math.PI / 4;
            let Rgrd = Math.sqrt(ch * ch + (cw / 2) * (cw / 2))
            let grd = ctx.createRadialGradient(cw / 2, 0, 0, cw / 2, 0, Rgrd); // x0, y0, r0, x1, y1, r1
            grd.addColorStop(0, "rgba(188, 211, 250, 0.2)");
            grd.addColorStop(.35, "rgba(250, 252, 255, 0.1)");
            grd.addColorStop(.75, "rgba(250, 252, 255, 0.1)");
            grd.addColorStop(1, "rgba(188, 211, 250, 0.2)");
            ctx.fillStyle = grd;

            ctx.strokeStyle = 'rgba(200,200,200,.3)';


            let randomIntFromInterval = (mn, mx) => {
                return Math.floor(Math.random() * (mx - mn + 1) + mn);
            }

            let Grd = function(x, y, r){
                grd = ctx.createRadialGradient(x, y - r / 20 * r, 0, x, y - r / 20 * r, r);
                grd.addColorStop(0, 'rgba(186,219,245,.7)');
                grd.addColorStop(1, 'rgba(250,250,252, 0.44)');
                return grd;
            };


            let ellipse = function(cx, cy, w, h, a, fill){

                let ox = w * kappa; // desplasamiento horizontal (offset)
                let oy = h * kappa; // desplazamiento vertical (offset)
                let rw = Math.sqrt(oy * oy + w * w);
                let rh = Math.sqrt(ox * ox + h * h);

                let aw = Math.atan(oy / w);
                let ah = Math.atan(ox / h);

                let x0 = cx + w * Math.cos(a);
                let y0 = cy + w * Math.sin(a);
                let x1 = cx + h * Math.cos(Math.PI / 2 + a);
                let y1 = cy + h * Math.sin(Math.PI / 2 + a);
                let x2 = cx + w * Math.cos(Math.PI + a);
                let y2 = cy + w * Math.sin(Math.PI + a);
                let x3 = cx + h * Math.cos((3 * Math.PI / 2) + a);
                let y3 = cy + h * Math.sin((3 * Math.PI / 2) + a);

                let px1 = cx + rw * Math.cos(aw + a);
                let py1 = cy + rw * Math.sin(aw + a);
                let px2 = cx + rh * Math.cos((Math.PI / 2 - ah) + a);
                let py2 = cy + rh * Math.sin((Math.PI / 2 - ah) + a);
                let px3 = cx + rh * Math.cos((Math.PI / 2 + ah) + a);
                let py3 = cy + rh * Math.sin((Math.PI / 2 + ah) + a);
                let px4 = cx + rw * Math.cos((Math.PI - aw) + a);
                let py4 = cy + rw * Math.sin((Math.PI - aw) + a);
                let px5 = cx + rw * Math.cos((Math.PI + aw) + a);
                let py5 = cy + rw * Math.sin((Math.PI + aw) + a);
                let px6 = cx + rh * Math.cos((3 * Math.PI / 2 - ah) + a);
                let py6 = cy + rh * Math.sin((3 * Math.PI / 2 - ah) + a);
                let px7 = cx + rh * Math.cos((3 * Math.PI / 2 + ah) + a);
                let py7 = cy + rh * Math.sin((3 * Math.PI / 2 + ah) + a);
                let px8 = cx + rw * Math.cos((-aw) + a);
                let py8 = cy + rw * Math.sin((-aw) + a);

                ctx.save();

                ctx.fillStyle = fill;
                ctx.beginPath();
                ctx.moveTo(x0, y0)
                ctx.bezierCurveTo(px1, py1, px2, py2, x1, y1);
                ctx.bezierCurveTo(px3, py3, px4, py4, x2, y2);
                ctx.bezierCurveTo(px5, py5, px6, py6, x3, y3);
                ctx.bezierCurveTo(px7, py7, px8, py8, x0, y0);
                ctx.fill();
                ctx.stroke();
                ctx.restore();

            }
            let elementArray = function(){
                this.cx = Math.round(Math.random() * cw) - 10;
                this.cy = Math.round(Math.random() * ch) - 10;
                this.x = this.cx;
                this.y = this.cy;
                this.rw = randomIntFromInterval(10, 30);
                let deformation = randomIntFromInterval(85, 98) / 100;
                this.rh = ~~(this.rw * deformation);
                this.a = (Math.round(Math.random() * 360) + 1) * rad;
                this.driftFlag = Math.random() < 0.5 ? false : true;
                this.lift = randomIntFromInterval(2, 10) / 10;
                this.grd = Grd(this.cx, this.cy, this.rw);

                return this;

            }
            
            if(e1.length < (howMany -5) || rechargeVal > 2000){
                //console.log('  e1 test '+e1);
                for (let i = 0; i < howMany; i++) {
                    e1[i] = new elementArray();
                }
                rechargeVal = 1;
            } else {
                let e2 = e1.map((obj)=>{
                    obj.x = obj.x + Math.round(Math.random() * floatSpeed-6);
                    obj.y = obj.y + Math.round(Math.random() * floatSpeed) + 6;
                })
                rechargeVal++;
            }
            
            
            ctx.fillRect(0, 0, cw, ch);
                for (let j = 0; j < e1.length; j++) {
                // rotation   
                    e1[j].a += .1;

                // lift
                if (e1[j].cy < -1 * e1[j].rw) {
                    e1[j].cy = ch + e1[j].rw;
                } else {
                    e1[j].cy -= e1[j].lift;
                }

                // drift
                if (e1[j].cx <= e1[j].x - 1) {
                    e1[j].driftFlag = true;
                } else if (e1[j].cx >= e1[j].x + 10) {
                    e1[j].driftFlag = false;
                }
                if (e1[j].driftFlag) {
                    e1[j].cx += .15;
                } else {
                    e1[j].cx -= .15;
                }

                // grd
                e1[j].grd = Grd(e1[j].cx, e1[j].cy, e1[j].rw);

                ellipse(e1[j].cx, e1[j].cy, e1[j].rw, e1[j].rh, e1[j].a, e1[j].grd);

            }

          }

    }
 
}



export default BubbleBuilder;