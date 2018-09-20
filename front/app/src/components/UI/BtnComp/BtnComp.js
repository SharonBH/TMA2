import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BtnComp.scss';

export class BtnComp extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['submit', 'button']).isRequired,
        submitFunc: PropTypes.func,
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
                    onSubmit={this.props.submitFunc} />
            </div>
        )
    }
}

export default BtnComp;  