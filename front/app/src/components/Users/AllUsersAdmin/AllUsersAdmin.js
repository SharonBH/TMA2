import React, { Component} from 'react'

import users from '../../../helpers/config'

export class AllUsersAdmin extends Component {
    render(){
        return (
            users.map((item, index) => {
                return <li>{item.name}</li>
            })
        )
    }
}

export default AllUsersAdmin;