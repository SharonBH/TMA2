import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './InputComp.scss'

export class InputComp extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['text', 'number', 'password', 'email', 'date','number', 'datetime-local', 'file']).isRequired,
        name: PropTypes.string.isRequired,
	    id: PropTypes.string,
        onChange: PropTypes.func,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array,
        ]),
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
    };

    render() {
        return (
            <div className=''>
                <input
                    className={classes.InputComp}
                    name={this.props.name}
                    id={this.props.id}
                    type={this.props.inputType}
                    value={this.props.content}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    autoFocus={this.props.autoFocus}
                />
            </div>
        )
    }
}

export default InputComp;  