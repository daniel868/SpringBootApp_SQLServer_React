import React, {Component} from 'react';
import LoginService from "../../../services/LoginService";


class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            username: '',
            password: '',
            email: '',
            role: '',

            titleVal: this.props.title,
            buttonVal: this.props.button
        }
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onRoleChange = (event) => {
        this.setState({role: event.target.value})
    }

    componentDidMount() {
        if (this.state.id != null) {
            LoginService.getUserById(this.state.id).then((response => {
                console.log(response.data)
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    role: response.data.role
                })
            }))
        }
    }

    saveUpdate = (event) => {
        event.preventDefault()

        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        console.log(user)
        if (this.state.id != null) {
            //TODO: update the user
            LoginService.updateNewUser(this.state.id, user).then(response => {
                console.log(response.data)
                this.props.history.push('/home/users')
            })
        } else {
            //TODO: save the flight
            LoginService.insertNewUser(user).then(response => {
                console.log(response.data)
                this.props.history.push('/home/users')
            })
        }
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/home/users')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row" style={{marginTop: "15px"}}>
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">{this.state.titleVal}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input placeholder="Username" name="username" className="form-control"
                                               value={this.state.username} onChange={this.onUsernameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input placeholder="Email" name="email" className="form-control" type="email"
                                               value={this.state.email} onChange={this.onEmailChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input placeholder="Password" name="password" className="form-control"
                                               type="password"
                                               value={this.state.password} onChange={this.onPasswordChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputState">Role</label>
                                        <select id="inputState" className="form-control" onChange={this.onRoleChange}
                                                value={this.state.role}>
                                            <option>Choose...</option>
                                            <option id={0}>{"ADMIN"}</option>
                                            <option id={1}>{"USER"}</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.saveUpdate}>{this.state.buttonVal}
                                    </button>
                                    <button className="btn btn-danger"
                                            style={{marginLeft: "10px", marginTop: "10px"}} onClick={this.cancel}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
