import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewUser } from '../../../actions/usersActions';
import classes from './CreateNewUser.scss';
import InputComp from '../../UI/InputComp/InputComp';
import BtnComp from '../../UI/BtnComp/BtnComp'


export class CreateNewUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            newUserList: [{
            name: '',
            userName: '',
            email: '',
            password: '',
            role: ''
        }]
    }
       
    }
    handleNameChange (e) { this.setState({ name: e.target.value });}
    handleUserNameChange (e) { this.setState({ userName: e.target.value });}
    handleEmailChange (e) { this.setState({ email: e.target.value }); }
    handlePasswordChange (e) { this.setState({ password: e.target.value }); }
    handleRoleChange (e) { this.setState({ role: e.target.value }); }

    handleSubmit = () => {
        const newUList = this.state.newUserList

        this.props.addNewUser(newUList)
    }

    render(){
        const newUList = this.state.newUserList
        console.log('newUList', newUList)
        return (
            <div className={(classes.usersWrapper, classes.createUsers)}>
            <Link to='all_users'><button>Back</button></Link>
            <h2>Create new user</h2>

            <form>
                <select  onChange={(e) => this.handleRoleChange(e)}>
                    <option>Choose type of user</option>
                    <option value='regular'>Regular User</option>
                    <option value='admin'>Administrator</option>
                </select>
                <InputComp inputType={'text'} name='createName' placeholder='Your Name' changeFunc={(e) => this.handleNameChange(e)}/>
                <InputComp inputType={'text'} name='createUserName' placeholder='Some User Name' changeFunc={(e) => this.handleUserNameChange(e)}/>
                <InputComp inputType={'email'} name='createEmail' placeholder='Enter Email' changeFunc={(e) => this.handleEmailChange(e)}/>
                <InputComp inputType={'password'} name='createPassword' placeholder='Enter Password' changeFunc={(e) => this.handlePasswordChange(e)}/>
                
                {/* <Link to='all_users'> */}
                <BtnComp inputType={'submit'} value="Submit" submitFunc={this.handleSubmit}/>
                {/* </Link> */}
            </form>
            

            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {

//     }
// }

const mapDispatchToProps = dispatch => {
    return{
        addNewUser: payload=>dispatch(addNewUser(payload))
  }
}
export default connect(null, mapDispatchToProps)(CreateNewUser);
