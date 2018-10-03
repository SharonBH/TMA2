import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import InputComp from '../UI/InputComp/InputComp';
import SelectComp from '../UI/SelectComp/SelectComp.js';
import { editProfileRequest, changePasswordRequest, editThisUserRequest } from '../../actions/Api';
import { successMessageAction, errorMessageAction } from '../../actions';
import Spinner from '../UI/Spinner';
import ChangePassword from '../ChangePassword/ChangePassword';
import { changePassOpenAction }  from '../../actions';


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
            this.closeWindowFunc()
            this.setState({changePassword: true})
        }, 200)
    }

    detailLine = (item, index) => {
        const detail = item.detail
        const edit = item.edit
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
                    : <span>{item.param}</span>
                }
                {
                    item.detail !== 'User Type' || this.props.editThisUser 
                    ?   <div className={classes.BTN}>
                            <i className={ 
                                edit 
                                    ?  classes.active + ' fas fa-pen' 
                                    : classes.notActive + ' fas fa-pen'  } 
                                onClick={() => this.editDetailBtn(index)}>
                            </i>
                        </div> 
                    :   null
                }
            </div>
        )
    }

    closeWindowFunc = () => {
        document.addEventListener("click", (evt) => {
            const changePassword = document.querySelector('.ChangePassword__changePass___3KRMY')
            const btn = document.querySelectorAll('.BtnComp__sendBtn___398uD')
            let targetEl = evt.target
            do {
                if (targetEl === changePassword || targetEl === btn) {
                    return 
                }
                targetEl = targetEl.parentNode;
                // Go up the DOM
            }
            while (targetEl)
            return  this.props.changePassOpenAction(false) || (this.props.messageErr(false))
            
        });
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
    

    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }

    changePassBtn = (username) => {
        setTimeout(() => {
            this.props.changePassOpenAction(true)
            this.closeWindowFunc()
        }, 200)
    }

    changePass = () => {
        return <ChangePassword headline='Change Password' classStr='none' />
    }
    userSummary = (headline, user) => {
        const name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
        return (
            <div className={classes.Profile}>
                <h1>{headline} {name}</h1>
                {this.spinner()}
                {this.state.userDetailsArr.map((item, index) => {
                    return this.detailLine(item, index)
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
                {this.props.editThisUser ? null : <span className={classes.changePass} onClick={this.changePassBtn}>Change Password</span>}   
                {this.props.passwords ? this.changePass() : null}
            </div>
        )
    }

    render() {
        console.log('summery', this.props)
        const { headline, user } = this.props
        return (
            <div className={classes.ProfileWrapper}>
                {this.userSummary(headline, user)}
                {this.state.changePassword ? <ChangePassword /> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessageReducer.errorMessage,
        successMessage: state.successMessageReducer.successMessage,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
        passwords: state.changePassReducer.passwords,
        currentUser: state.UserLogInReducer.currentUser,
        editThisUser: state.editUserReducer.editThisUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfileRequest: (userName, name, email, userType) => dispatch(editProfileRequest(userName, name, email, userType)),
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword)),
        errorMessageAction: payload => dispatch(errorMessageAction(payload)),
        successMessageAction: payload => dispatch(successMessageAction(payload)),
        editThisUserRequest: (userName, name, email, userType) => dispatch(editThisUserRequest(userName, name, email, userType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);