import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './SelectComp.scss';

export class SelectIdComp extends Component {
    
    static propTypes = {  
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        content: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        selected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    };


    render(){
        return (
            <div className={classes.SelectComp}>
                <select
                    name={this.props.name}
                    value={this.props.content}
                    onChange={this.props.onChange}
                    className={classes.SelectCompInput}
                >
                <option value="">{this.props.placeholder}</option>

                {this.props.options.map((data,key) => {
                    return (
                    <option
                        key={key}
                        value={data.key}
                    >{data.value}
                    </option>
                    );
                })}
                </select>
            </div>
        )
    }
}

export default SelectIdComp;  