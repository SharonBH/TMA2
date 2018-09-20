import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './SelectComp.scss';

export class SelectComp extends Component {
    
    static PropTypes = {  
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        selectedOption: PropTypes.string,
        controlFunc: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    };

    render(){
        return (
            <div className={classes.SelectComp}>
                <select
                    name={this.props.name}
                    value={this.props.selectedOption}
                    onChange={this.props.controlFunc}
                    className={classes.SelectCompInput}>
                <option value="">{this.props.placeholder}</option>
                {this.props.options.map(opt => {
                    return (
                    <option
                        key={opt}
                        value={opt}>{opt}
                    </option>
                    );
                })}
                </select>
            </div>
        )
    }
}

export default SelectComp;  