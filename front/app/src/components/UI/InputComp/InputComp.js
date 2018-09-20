import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './InputComp.scss'

export class InputComp extends Component {
    
    static PropTypes = {  
        inputType: PropTypes.oneOf(['text', 'number', 'password', 'email']).isRequired,
        name: PropTypes.string.isRequired,
        changeFunc: PropTypes.func.isRequired,
        content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        ]).isRequired,
        placeholder: PropTypes.string,
    };

    render(){
        return (
            <div className=''>
                <input
                    className={classes.InputComp}
                    name={this.props.name}
                    type={this.props.inputType}
                    value={this.props.content}
                    onChange={this.props.changeFunc}
                    placeholder={this.props.placeholder} />
            </div>
        )
    }
}

export default InputComp;  