import React, {Component} from 'react';
import LoginService from "../../../services/LoginService";
import Sidebar from "../../nav_bars/Sidebar";
import DropdownDisplayData from "../../reusableComponents/utils/DropdownDisplayData";
import UpdateDeleteDropdown from "../../reusableComponents/utils/UpdateDeleteDropdown";

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromApi: []
        }
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount() {
        LoginService.getAllUsers().then(response => {
            this.setState({dataFromApi: response.data})
            console.log(response.data)
        })
    }

    updateUser(userId) {
        console.log("Update user " + userId)
        this.props.history.push(`/update-user/${userId}`)
    }

    deleteUser(userId) {
        console.log("Delete user " + userId)
    }

    render() {
        return (
            <div>
                <Sidebar userDetail={this.props.userDetail}/>
                <h2 className="text-center">Users</h2>
                <div className="row" style={{marginLeft: "10px", marginRight: "10px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Roles</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.dataFromApi.map(
                                row =>
                                    <tr key={row.id}>
                                        <td>{row.username}</td>
                                        <td>{row.email}</td>
                                        <td>{row.password}</td>
                                        <td>{row.role}</td>
                                        <UpdateDeleteDropdown id={row.id}
                                                              updateItem={this.updateUser}
                                                              deleteItem={this.deleteUser}
                                        />
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
            ;
    }
}

export default SearchUser;