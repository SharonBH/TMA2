import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BtnComp.scss';

export class EditBtn extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['submit', 'button']).isRequired,
        onSubmit: PropTypes.func,
        onClick: PropTypes.func,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired
    };

    render(){
        return (
            <div className={`${classes.editBtn} `}>
                {/* <input
                    className={classes.editBtn}
                    type={this.props.inputType}
                    value={this.props.content}
                    onSubmit={this.props.onSubmit} 
                    onClick={this.props.onClick} 
                    /> */}
                   <i
                    className='far fa-edit'
                    type={this.props.inputType}
                    value={this.props.content}
                    onSubmit={this.props.onSubmit} 
                    onClick={this.props.onClick} 
                    ><span>Edit</span></i>
            </div>
        )
    }
}

export default EditBtn;  