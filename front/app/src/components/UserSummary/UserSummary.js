import React, { Component } from 'react';
import classes from './UserSummary.scss';
import { connect } from 'react-redux';
import BtnComp from '../UI/BtnComp/BtnComp';
import InputComp from '../UI/InputComp/InputComp';
import SelectComp from '../UI/SelectComp/SelectComp.js';
import { editProfileRequest } from '../../actions/Api';
import { editDeniedAction } from '../../actions';
import Spinner from '../UI/Spinner';
import ChangePassword from '../ChangePassword';

class UserSummary extends Component {

    constructor(props) {
        super(props)

        const name = this.props.user.name
        const username = this.props.user.username
        const email = this.props.user.email
        const password = this.props.user.password
        const role = this.props.user.role

        this.state = {
            changePassword: false,
            userDetailsArr: [
                {edit: false, detail: 'Name', param: name, editInput: name},
                {edit: false, detail: 'User Name', param: username, editInput: username},
                {edit: false, detail: 'eMail', param: email, editInput: email},
                {edit: false, detail: 'User Type', param: role,  editInput: role},
                {edit: false, detail: 'Password', param: password, editInput: password}
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
            this.state.userDetailsArr[4].editInput,
        )
    }

    changePassword = () => {
        setTimeout(() => {
            this.closeWindowFunc()
            this.setState({changePassword: true})
        }, 200)
    }

    closeWindowFunc = () => {
        document.addEventListener("click", (evt) => {
            const forgotPassword = document.querySelector('.ChangePassword__ForgotPassword___2NgBY')
            const btn = document.querySelectorAll('.UserSummary__ChangePassword___3igf9')
            let targetEl = evt.target
            do {
                if (targetEl === forgotPassword || targetEl === btn) {
                    return
                }
                // Go up the DOM
                targetEl = targetEl.parentNode;
            }
            while (targetEl)
            this.setState({changePassword: false})
        });
    }

    detailLine = (item, index) => {
        const detail = item.detail
        const edit = item.edit
        return (
            <div key={index}>
                {
                    detail === 'Password'
                    ?   <div className={classes.ChangePassword}>
                            <BtnComp 
                                className={classes.smallBtn} 
                                inputType="submit" 
                                content={'Change Password'} 
                                onClick={this.changePassword}
                            />
                        </div>
                    :   <div>
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
                            <div className={classes.EditBtn}>
                                <BtnComp 
                                    className={classes.smallBtn} 
                                    inputType="submit" 
                                    content={edit ? 'Not Now' : 'Edit'} 
                                    onClick={() => this.editDetailBtn(index)}
                                />
                            </div>
                        </div>
                }
            </div>
        )
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
                        className={classes.smallBtn} 
                        inputType="submit" 
                        content='Submit All Changes'
                        onClick={this.submitAllChangesDetails}
                    />
                </span>
            </div>
        )
    }

    render() {
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProfileRequest: (name, userName, email, password, userType) => dispatch(editProfileRequest(name, userName, email, password, userType)),
        editDeniedAction: payload => dispatch(editDeniedAction(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSummary);