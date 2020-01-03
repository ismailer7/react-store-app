import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import Preffered from '../Preffered';


const MyRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/preffered" component={Preffered}></Route>
    </Switch>
)

class Navigation extends Component {
    render() {
        return (
              <Router>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand"><Link to={'/'}>LOGO</Link></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <a className="nav-link"><Link to={'/'}>Nearby Shops</Link></a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link"><Link to={'/preffered'}>Preffered List</Link></a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link"><Link to={'/login'}>Login</Link> </a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link"><Link to={'/register'}>Register</Link> </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                    <MyRoutes />
              </Router>
        )
    }
}

export default Navigation;