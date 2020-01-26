import React, { Component } from "react";
import './static/index.css';
import { Redirect } from "react-router-dom";
import { BrowserRouter as Link} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: -1,
            username: '',
            password: '',
            isAuth: false,
            authorization: ''
        };
    
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
          event.preventDefault();
          fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
          })
          .then(response => {
                if(response.status !== 200) {
                    return response.text()
                } else {
                    return response.json()
                }
          })
          .then(data => {
              if(typeof(data) !== 'string') {
                const encode = new Buffer(this.state.username + ':' + this.state.password).toString('base64');
                this.setState({
                    userId: data['id'],
                    username: data['username'],
                    password: data['password'],
                    errorMessage: '',
                    isAuth: true,
                    authorization: 'Basic ' + encode
                })
              } else {
                this.setState({
                    userId: -1,
                    errorMessage: data,
                    isAuth: false,
                    authorization: ''
                })
              }
          })
          .catch(err => console.error(err))
      }

      renderRedirectToHomePage = () => {
        if (this.state.isAuth) {
            const userId = this.state.userId
            const auth = this.state.authorization
            console.log("while redirect", userId)
            return <Redirect 
                    to = {{
                        pathname: '/',
                        credentials: {
                            id: userId,
                            authorization: auth,
                            isAuth: this.state.isAuth
                        }
                    }}
                />
        }
      }

    render() {
        const errorMsg = this.state.errorMessage
        
        return (
            
            <div class="login-container">
                {this.renderRedirectToHomePage()}
                <div class="login-form-1">
                    <h3>Please sign in</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <input 
                             style={{
                                  borderColor: errorMsg ? "red" : ""
                                }} 
                             
                             type="text" id="username" name="username" class="form-control" defaultValue={this.state.username} onChange={this.handleChangeUsername} placeholder="Your Username *" required autoFocus></input>
                        </div>
                        <div class="form-group">
                            <input  
                                style={{
                                  borderColor: errorMsg ? "red" : ""
                                }} 
                                type="password" id="password" name="password" class="form-control" defaultValue={this.state.password} onChange={this.handleChangePassword} placeholder="Your Password *" required></input>
                        </div>
                        <div class="form-group">
                            <input class="btnSubmit" type="submit" value="Sign in" />
                        </div>
                        <div class="form-group">
                            <Link to={'/register'} className="createAccount">
                              Don't have an account? create one now!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;