import React, {Component} from 'react';
import logo from "./assets/logo.jpg"
import LoginService from "./services/LoginService";
import "./App.css"

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insertedUsername: '',
            insertedPassword: ''
        }
    }

    onChangeUsername = (event) => {
        this.setState({insertedUsername: event.target.value})
    }
    onChangePassword = (event) => {
        this.setState({insertedPassword: event.target.value})
    }

    handleSubmit = (event) => {

        event.preventDefault();
        let loginDto = {
            insertedUsername: this.state.insertedUsername,
            insertedPassword: this.state.insertedPassword
        }

        LoginService.checkUserCredentials(loginDto).then((response => {
            if (response.data === true) {
                this.props.parentCallback(loginDto)
                this.props.history.push('/home')
            } else {
                alert("Invalid credentials")
            }
        }))
    }

    render() {
        return (
            <div className="login-background">
                <div className="login">
                    <div className="container">
                        <form className="login-form">
                            <div className="text-center" style={{marginBottom: 10}}>
                                <img src={logo} className="logo" alt="Logo"/>
                            </div>

                            <div className="login-input-group">
                                <label className="login-input-label">Username</label>
                                <input className="login-input-textBox" name="email"
                                       placeholder="Username here..."
                                       value={this.state.insertedUsername} onChange={this.onChangeUsername}/>
                            </div>

                            <div className="login-input-group">
                                <label className="login-input-label" htmlFor="password">Password</label>
                                <input className="login-input-textBox" type="password" name="password"
                                       value={this.state.insertedPassword}
                                       onChange={this.onChangePassword}/>
                            </div>
                            <button className="login-button" style={{marginTop: "10px"}}
                                    onClick={this.handleSubmit}>Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default LoginComponent;