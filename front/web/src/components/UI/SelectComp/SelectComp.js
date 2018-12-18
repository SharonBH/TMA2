import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './SelectComp.scss';

export class SelectComp extends Component {
    
    static propTypes = {  
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        content: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string
    };

    render(){
        return (
            <div className={classes.SelectComp}>
                <label></label>
                <select
                    name={this.props.name}
                    value={this.props.content}
                    onChange={this.props.onChange}
                    className={classes.SelectCompInput}
                    disabled={undefined !== this.props.isSelectDisabled && this.props.isSelectDisabled}
                >
                <option value="" >{this.props.placeholder}</option>

                {this.props.options.map((data,key) => {
                    return (
                    <option
                        key={key}
                        value={data.value}
                    >{data.value}
                    </option>
                    );
                })}
                </select>
            </div>
        )
    }
}

export default SelectComp;  