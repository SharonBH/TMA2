import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../../Register/RegisterComp.scss';
import { editThisUserAction } from "../../../actions/Api";
import { connect } from 'react-redux';
import InputComp from '../../UI/InputComp/InputComp';
import BtnComp from '../../UI/BtnComp/BtnComp';
import SelectComp from '../../UI/SelectComp/SelectComp';
import Spinner from '../../UI/Spinner/Spinner';

class EditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            userType: '',
            userName: '',
            someSelectArrayFromApiProps:['User', 'Admin'],
            errMessage: '',
            userData: '',
            message: ''
        }
    }

    componentDidMount(){
        
            const users = this.props.allUsersList
            const user = this.props.user
            const userData = users.find(item => item.username  === user )
            
        if(userData !== undefined){
            this.setState({userData: userData})
        }
    }
    onEmailChange = (e) => { this.setState({ email: e.target.value })}
    onNameChange = (e) => { this.setState({ name: e.target.value})}
    onUseTypeChange = (e) => { this.setState({userType: e.target.value})}
    onUserNameChange = (e) => { this.setState({userName: e.target.value})}

    spinner = () => {
        if (this.props.toggleSpinner) {
            return <Spinner />
        } else {
            return null
        }
    }
    editSbmit = (e) => {
        const email = this.state.email
        const name = this.state.name
        const userType = this.state.userType
        const userName = this.state.userName
        e.preventDefault()

        if(this.state.userData.password !== this.state.userData.confirmPassword){
            this.setState({message: 'password not match'})
        }else{
            this.props.editThisUserAction(email, name, userType, userName)
            if(this.props.catchErrorNum !== null){
                this.setState({message: this.props.catchErrorNum})
            }else{
                this.setState({message: 'Updeted successfuly'})
            }
        }
        
        
    }

    errorMessage = () => {
        const errorNum = this.props.catchErrorNum.message
        const error = this.props.editErrorMessage
        if (error) {
            return <p>Error: {error} - {errorNum}</p>
        } else {
            return null
        }
    }
    

    editFage = () => {
        console.log(this.props.catchErrorNum)
        return (
            <div className={classes.Register}>
                <h1>Edit User</h1>
                <form>
                    
                    <InputComp inputType="email" name="email" placeholder={this.state.userData.email} onChange={this.onEmailChange} />
                    <InputComp inputType="text" name="name" placeholder={this.state.userData.name} onChange={this.onNameChange}/>
                    <SelectComp 
                        onChange={this.onUseTypeChange}
                        options={this.state.someSelectArrayFromApiProps}
                        placeholder={this.state.userData.role}
                    />
                    <InputComp inputType="text" name="userName" placeholder={this.state.userData.username} onChange={this.onUserNameChange}/>
                    
                    {this.errorMessage()}
                    {this.state.message}
                    <BtnComp inputType="submit" name="register" content="Save" onClick={this.editSbmit}/>
                </form>
                {/* <Link to='/all_users'><BtnComp inputType={'button'} content={'Back To Users'}></BtnComp></Link> */}
            </div>
        )
    }

    render() {
        console.log('this.props', this.props)
        return (
            <div className={classes.RegisterWrapper}>
                {this.spinner()}
                {this.editFage()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.UserLogInReducer.currentUser,
        allUsersList: state.userReducer.allUsersList,
        editErrorMessage: state.editErrorMessageReducer.editErrorMessage,
        catchErrorNum: state.errorReducer.catchErrorNum,
        toggleSpinner: state.toggleLoaderReducer.toggleSpinner,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editThisUserAction: (email, name, userType, userName) => dispatch(editThisUserAction(email, name, userType, userName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);