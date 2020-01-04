import React, { Component } from "react";
import './static/index.css';

class Login extends Component {


    state = {
        email: '',
        password: ''
    }

    render() {
        const {email, password} = this.state
        return (
            <div class="login-container">
                <div class="login-form-1">
                    <h3>Login In</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" defaultValue={email} onChange={() => this.setState({email})} />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Your Password *" defaultValue={password} onChange={() => this.setState({password})} />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;