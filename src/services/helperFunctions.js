// mapping and other helper methods 

export const RangeMap = (val) => {

    let v = val;
    return function map(in_min, in_max, out_min, out_max) {
        return (v - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

//export default RangeMap;

export const IsUploadSupported = () => {
    let verdict = true;
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        verdict = false;
    }
    return verdict;
};


/* Phi correlation table : 
*       n11 n00 - n10 n01
* phi = -----------------
*       sqrt n1*n0*n01*n00
* That is all measurements where both variables are true n11 
* times when both variables are false n00 minus first variable is true
* and second varibale false times first false and second true
* Divisor is sq root of sum of first var true times first var false
* times second var true times second var false
*/

export const CalcPhi = (table) => {

    let dividend = ((table[3] * table[0]) - (table[2] * table[1]));
    let divisor =   Math.sqrt((table[2] + table[3]) *
                                (table[0] + table[1]) *
                                (table[1] + table[3]) *
                                (table[0] + table[2]));

    return dividend / divisor;
}



