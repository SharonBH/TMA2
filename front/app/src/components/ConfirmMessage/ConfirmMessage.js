import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import { confirmMessageAction } from '../../actions';
import { DeleteUserRequest } from '../../actions/Api';
import classes from './ConfirmMessage.scss';

class ConfirmMessage extends Component {

    componentWillUnmount() {
        this.denied()
    }

    denied = () => {
        this.props.confirmMessageAction(false)
    }

    approve = (headline, user) => {
        switch(headline) {
            case 'delete':
            this.props.DeleteUserRequest(user.username)
            default: 
        }
        this.denied()
    }

    render() {
        const { headline, user } = this.props
        return (
            <div className={classes.ConfirmMessageWrapper}>
                <div className={classes.ConfirmMessage}>
                    <p>Are you sure you want to - {headline} -</p>
                    <div className={classes.btm}>
                        <BtnComp inputType="submit" name="Approve" content="Approve" onClick={() => this.approve(headline, user)}/>
                        <BtnComp inputType="submit" name="Denied" content="Denied" onClick={this.denied}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirmMessageAction: payload => dispatch(confirmMessageAction(payload)),
        DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMessage);