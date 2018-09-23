import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './InputComp.scss'

export class InputComp extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['text', 'number', 'password', 'email']).isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        placeholder: PropTypes.string,
    };

    render() {
        return (
            <div className=''>
                <input
                    className={classes.InputComp}
                    name={this.props.name}
                    type={this.props.inputType}
                    value={this.props.content}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder} 
                />
            </div>
        )
    }
}

export default InputComp;  