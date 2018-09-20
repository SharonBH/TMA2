import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './SelectComp.scss';

export class SelectComp extends Component {
    
    static propTypes = {  
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        selectedOption: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string
    };

    render(){
        return (
            <div className={classes.SelectComp}>
                <select
                    name={this.props.name}
                    value={this.props.selectedOption}
                    onChange={this.props.onChange}
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