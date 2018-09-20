import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BtnComp.scss';

export class BtnComp extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['submit', 'button']).isRequired,
        onClick: PropTypes.func,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired
    };

    render(){
        return (
            <div className='BtnComp'>
                <input
                    className={(classes.BtnComp, classes.bigBtn, classes.smallBtn)}
                    type={this.props.inputType}
                    value={this.props.content}
                    onClick={this.props.onClick} />
            </div>
        )
    }
}

export default BtnComp;  