import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BtnComp.scss';

export class EditBtn extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['submit', 'button']).isRequired,
        onSubmit: PropTypes.func,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired
    };

    render(){
        return (
            <div className='BtnComp'>
                <input
                    className={`${classes.editBtn} `}
                    type={this.props.inputType}
                    value={this.props.content}
                    onSubmit={this.props.onSubmit} />
            </div>
        )
    }
}

export default EditBtn;  