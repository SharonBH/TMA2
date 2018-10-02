import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import EditBtn from '../UI/BtnComp/EditBtn';
import InputComp from '../UI/InputComp/InputComp';
import SelectComp from '../UI/SelectComp/SelectComp.js';
import { editProfileRequest, changePasswordRequest } from '../../actions/Api';
import { editDeniedAction } from '../../actions';
import Spinner from '../UI/Spinner';
import ChangePassword from '../ChangePassword/ChangePassword';
import { changePassOpenAction }  from '../../actions';
import history  from '../../configuration/history';
import store  from '../../configuration/store';


class UserSummary extends Component {

    constructor(props) {
        super(props)

        // const userList = ''
        // if(this.props.user !== '' || this.props.user !== null || this.props.user !== undefined){
        //    userList = this.props.user 
        // } else {
        //    userList = this.state.currentUser 
        // }
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
                {edit: false, detail: 'Name', param: name, editInput: name},
                {edit: false, detail: 'User Name', param: username, editInput: username},
                {edit: false, detail: 'eMail', param: email, editInput: email},
                {edit: false, detail: 'User Type', param: role,  editInput: role},
            ],
        }
        this.editDetail = this.editDetailBtn.bind(this)
    }
    
    componentWillUnmount() {
        this.props.editDeniedAction(null)
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
    
    submitAllChangesDetails = () => {
        this.props.editProfileRequest(
            this.state.userDetailsArr[0].editInput,
            this.state.userDetailsArr[1].editInput,
            this.state.userDetailsArr[2].editInput,
            this.state.userDetailsArr[3].editInput,
            this.state.password
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
                                options={['user', 'admin']}
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
                <div className={classes.BTN}>

                    <i className={ 
                        edit 
                            ?  classes.active + ' fas fa-pen' 
                            : classes.notActive + ' fas fa-pen'  } 
                        onClick={() => this.editDetailBtn(index)}>
                    </i>
                </div>
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
            return <p>{error}</p>
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
                <span className={classes.SubmitAll}>
                    <BtnComp 
                        className={classes.editBtn} 
                        inputType="submit" 
                        content='Submit All Changes'
                        onClick={this.submitAllChangesDetails}
                    />
                </span>
                <span className={classes.changePass} onClick={this.changePassBtn}>Change Password</span>
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
        errorMessage: state.editErrorMessageReducer.errorMessage,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
        passwords: state.changePassReducer.passwords,
        messageErr: state.changePassReducer.messageErr,
        currentUser: state.UserLogInReducer.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfileRequest: (name, userName, email, password, userType) => dispatch(editProfileRequest(name, userName, email, password, userType)),
        editDeniedAction: payload => dispatch(editDeniedAction(payload)),
        changePassOpenAction: payload => dispatch(changePassOpenAction(payload)),
        changePasswordRequest: (username, password, newPassword, confirmPassword) => dispatch(changePasswordRequest(username, password, newPassword, confirmPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);