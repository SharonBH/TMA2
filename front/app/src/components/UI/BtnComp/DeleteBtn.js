import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BtnComp.scss';

export class DeleteBtn extends Component {
    
    static propTypes = {  
        inputType: PropTypes.oneOf(['submit', 'button']).isRequired,
        onSubmit: PropTypes.func,
        onClickt: PropTypes.func,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired
    };

    render(){
        return (
            <div className={`${classes.deleteBtn} `}>
                <i
                    className={'fas fa-trash-alt'}
                    type={this.props.inputType}
                    value={this.props.content}
                    onSubmit={this.props.onSubmit} 
                    onClick={this.props.onClick}
                    id={this.props.id} 
                ><span>Delete</span></i>
            </div>
        )
    }
}

export default DeleteBtn;  