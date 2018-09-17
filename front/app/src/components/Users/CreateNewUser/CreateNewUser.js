import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewUser } from '../../../actions/usersActions'


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
            <div className='users-wrapper create-users'>
            <Link to='all_users'><button>Back</button></Link>
            <h2>Create new user</h2>

            <form>
                <select  onChange={(e) => this.handleRoleChange(e)}>
                    <option>Choose type of user</option>
                    <option value='regular'>Regular User</option>
                    <option value='admin'>Administrator</option>
                </select>
                <input type='text' name='createName' placeholder='Your Name' onChange={(e) => this.handleNameChange(e)}/>
                <input type='text' name='createUserName' placeholder='Some User Name' onChange={(e) => this.handleUserNameChange(e)}/>
                <input type='email' name='createEmail' placeholder='Enter Email' onChange={(e) => this.handleEmailChange(e)}/>
                <input type='password' name='createPassword' placeholder='Enter Password' onChange={(e) => this.handlePasswordChange(e)}/>
                
                {/* <Link to='all_users'> */}
                <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
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
