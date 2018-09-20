import React, { Component } from 'react';
import MDSpinner from "react-md-spinner";

class Spinner extends Component {
    
    render() {
        return (
            <MDSpinner 
                size={50} 
                duration={2500} 
                color1={'#03a3d0'}
                color2={'#d65000'}
                color3={'#03a3d0'}
                color4={'#999999'}
                borderSize={4}
                style={{'margin': '10px'}}
            />
        );
    }
}

export default Spinner;