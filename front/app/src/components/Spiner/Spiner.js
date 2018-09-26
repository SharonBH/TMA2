import React, { Component } from 'react';
import MDSpinner from "react-md-spinner";
import classes from './Spiner.scss';

class Spinner extends Component {
    
    render() {
        return (
            <div className={classes.SpinnerWrapper}>
                <div className="Spinner">
                    <MDSpinner 
                        size={50} 
                        duration={2500} 
                        color1={'rgba(63, 168, 168, 0.9)'}
                        color2={'black'}
                        color3={'rgba(63, 168, 168, 0.9)'}
                        color4={'black'}
                        borderSize={4}
                        style={{'marginTop': '100px'}}
                    />
                </div>
            </div>
        );
    }
}

export default Spinner;