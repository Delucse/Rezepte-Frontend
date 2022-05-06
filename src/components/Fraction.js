import React from 'react';

import FractionJS from 'fraction.js'

function Fraction(props){
    var fraction = new FractionJS(props.decimal);
    var numerator = fraction.n; // Zähler
    var denominator = fraction.d; // Nenner
    var int = Math.floor(numerator/denominator);

    return (
        numerator !== 0 ?
            denominator === 1 ?
                <div>{numerator}</div> 
            :
                int > 0 ?
                    <div style={{display: 'flex'}}>{int}<div style={{marginLeft: '4px'}}><sup style={{fontSize: '60%', top: '-0.40em', marginRight: '1px'}}>{numerator%denominator}</sup>&#8260;<sub style={{fontSize: '60%', bottom: '0em', marginLeft: '1px'}}>{denominator}</sub></div></div>
                : <div><sup style={{fontSize: '60%', top: '-0.40em', marginRight: '1px'}}>{numerator}</sup>&#8260;<sub style={{fontSize: '60%', bottom: '0em', marginLeft: '1px'}}>{denominator}</sub></div>            
        : <div>{0}</div>
    );
}

export default Fraction;