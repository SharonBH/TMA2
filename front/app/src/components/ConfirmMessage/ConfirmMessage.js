import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import { signOutConfirmMessageAction, deleteUserConfirmMessageAction, getUserAction } from '../../actions';
import { DeleteUserRequest } from '../../actions/Api';
import classes from './ConfirmMessage.scss';
import history from '../../configuration/history';

class ConfirmMessage extends Component {

    componentWillUnmount() {
        this.denied()
    }

    denied = () => {
        this.props.signOutConfirmMessageAction(false)
        this.props.deleteUserConfirmMessageAction(false)
    }

    approve = (headline, user) => {
        switch(headline) {
            case 'delete user':
                this.props.DeleteUserRequest(user.username)
                break
            case 'sign out':
                this.props.getUserAction(null)
                localStorage.clear();
                sessionStorage.clear();
                history.push({pathname: '/'})
                break
            default: 
        }
        this.denied()
    }

    render() {
        const { headline, user } = this.props
        return (
            <div className={classes.ConfirmMessageWrapper}>
                <div className={classes.ConfirmMessage}>
                    <p>Are you sure you want to - {headline} - {user.username}</p>
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
        signOutConfirmMessageAction: payload => dispatch(signOutConfirmMessageAction(payload)),
        deleteUserConfirmMessageAction: payload => dispatch(deleteUserConfirmMessageAction(payload)),
        DeleteUserRequest: payload => dispatch(DeleteUserRequest(payload)),
        getUserAction: payload => dispatch(getUserAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMessage);