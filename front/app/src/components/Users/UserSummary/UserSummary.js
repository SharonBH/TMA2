import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../../UI/BtnComp/BtnComp';
import InputComp from '../../UI/InputComp/InputComp';
import SelectComp from '../../UI/SelectComp/SelectComp.js';
import { editProfileRequest, changePasswordRequest, editThisUserRequest } from '../../../actions/Api';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { changePassOpenAction, successMessageAction, errorMessageAction, editThisUserAction }  from '../../../actions';

class UserSummary extends Component {

    constructor(props) {
        super(props)

        const userData = this.props.user
        const name = userData.name
        const username = userData.username
        const email = userData.email
        const password = userData.password
        const role = userData.role

        this.state = {
            currentUser: '',
            changePassword: false,
            password: password,
            userDetailsArr: [
                {edit: false, detail: 'User Name', param: username, editInput: username},
                {edit: false, detail: 'Name', param: name, editInput: name},
                {edit: false, detail: 'eMail', param: email, editInput: email},
                {edit: false, detail: 'User Type', param: role,  editInput: role},
            ],
        }
        this.editDetail = this.editDetailBtn.bind(this)
    }
    
    componentWillUnmount() {
        this.props.errorMessageAction(null)
        this.props.successMessageAction(null)
        this.setState({changePassword: false})
    }

    editDetailBtn = (index) => {
        const details = Object.assign([], this.state.userDetailsArr)
       
        if(details[index].edit) {
            details[index].edit = false
        } else {
            details[index].edit = true
        }
        this.setState({userDetailsArr: details})
    }

    editDetailInput = (index, e) => {
        const details = Object.assign([], this.state.userDetailsArr)
            details[index].editInput = e.target.value
        this.setState({
            userDetailsArr: details
        })
    }
    
    submitProfileChanges = () => {
        this.props.editProfileRequest(
            this.state.userDetailsArr[0].editInput,
            this.state.userDetailsArr[1].editInput,
            this.state.userDetailsArr[2].editInput,
            this.state.userDetailsArr[3].editInput,
        )
    }

    submitUserAditeChanges = () => {
        this.props.editThisUserRequest(
            this.state.userDetailsArr[0].editInput,
            this.state.userDetailsArr[1].editInput,
            this.state.userDetailsArr[2].editInput,
            this.state.userDetailsArr[3].editInput,
        )
    }

    changePassword = () => {
        setTimeout(() => {
            // this.closeWindowFunc()
            this.setState({changePassword: true})
        }, 200)
    }

    editBtnFunc = (item, index) => {
        if(item.detail === 'Name' || item.detail === 'eMail' || (this.props.editThisUser && item.detail !== 'User Name' )) {
            return (
                <div className={classes.BTN}>
                    <i className={ 
                        item.edit 
                            ?  classes.active + ' fas fa-pen' 
                            : classes.notActive + ' fas fa-pen'  } 
                        onClick={() => this.editDetailBtn(index)}>
                    </i>
                </div> 
            )
        } else {
            return null
        }
    }

    detailLine = (item, index, headline) => {
        const detail = item.detail
        return (

            <div key={index} className={classes.wrappLine}>
                <label className={classes.HeadLine} name={detail}>{detail}:</label>
                {
                    this.state.userDetailsArr[index].edit
                    ? <div className={classes.EditInput}>
                        {
                            detail === 'User Type'
                            ? <SelectComp 
                                onChange={(e) => this.editDetailInput(index, e)}
                                options={['User', 'Admin']}
                                placeholder='Select User Type'
                            />
                            : <InputComp 
                                inputType={'text'}
                                name={detail} 
                                placeholder={detail} 
                                content={this.state.userDetailsArr[index].editInput}
                                onChange={(e) => this.editDetailInput(index, e)}
                            />
                        } 
                      </div> 
                    : headline === "Edit" ? <span className={classes.editLineInput}>{item.param}</span> : <span>{item.param}</span>
                }
                {this.editBtnFunc(item, index)}
            </div>
        )
    }

    errorMessage = () => {
        const error = this.props.errorMessage
        if (error !== null) {
            return <p className={classes.error}>{error}</p>
        } else {
            return null
        }
    }
    successMessage = () => {
        const success = this.props.successMessage
        if (success !== null) {
            this.props.errorMessageAction(null)
            return <p className={classes.success}>{success}</p>
        } else {
            return null
        }
    }

    changePassBtn = (username) => {
        this.props.successMessageAction(null)
        this.props.errorMessageAction(null)
        setTimeout(() => {
            this.props.changePassOpenAction(true)
            this.setState({username: username})
        }, 200)
    }

    closePopUp = () => {
        this.props.editThisUserAction(false)
    }

    userSummary = (headline, user) => {
        const headLine = headline;

        const name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
        return (
            <div className={classes.Profile} >
                <h1>{headline} {name}</h1>
                {this.state.userDetailsArr.map((item, index) => {
                    return this.detailLine(item, index, headLine)
                })}
                {this.errorMessage()}
                {this.successMessage()}
                <span className={classes.SubmitAll}>
                    <BtnComp 
                        className={classes.editBtn} 
                        inputType="submit" 
                        content='Submit All Changes'
                        onClick={this.props.headline === 'Your Profile' ? this.submitProfileChanges : this.submitUserAditeChanges}
                    />
                </span>
                {headline === 'Edit' ? <div className={classes.closePopBtn} onClick={this.closePopUp}><span>Close</span></div> : null}
                {this.props.editThisUser ? null : <span className={classes.changePass}  onClick={this.changePassBtn}>Change Password</span>}   
                {this.props.passwords ? <ChangePassword headline='Change Password' user={user.username} classStr='none' /> : null}
                
            </div>
        )
    }

    render() {
        console.log('111', this.props)
        const { headline, user } = this.props
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline, user)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessageReducer.errorMessage,
        successMessage: state.successMessageReducer.successMessage,
        passwords: state.changePassReducer.passwords,
        currentUser: state.UserLogInReducer.currentUser,
        editThisUser: state.editUserReducer.editThisUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfileRequest: (userName, name, email, userType) => dispatch(editProfileRequest(userName, name, email, userType)),
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        editThisUserAction: (payload) => dispatch(editThisUserAction(payload)),
        editThisUserRequest: (userName, name, email, userType) => dispatch(editThisUserRequest(userName, name, email, userType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);