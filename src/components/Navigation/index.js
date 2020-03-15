import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from '../Home';
import Login from '../Login';
import Logout from '../Logout';
import Register from '../Register';
import Preffered from '../Preffered';
import ShopDetail from '../ShopDetail';
import HomeLogo from './static/home_icon.png';

const MyRoutes = () => (
    <Switch>
       
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/preffered" component={Preffered}></Route>
        <Route exact path="/shop/:placeId" component={ShopDetail}></Route>
    </Switch>
)

class Navigation extends Component {

    componentDidMount() {
        console.log('navigation mount..')
    }

    render() {
        return (
              <Router>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <a class="navbar-brand">
                        <Link to={'/'}>
                            <img src={HomeLogo} width={'50px'} height={'50px'}/>
                        </Link>
                    </a>
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
                            {
                                !localStorage.getItem('currentUser')
                                &&
                                <a className="nav-link"><Link to={'/login'}>Login</Link></a>
                            }
                            {
                                localStorage.getItem('currentUser')
                                &&
                                <a className="nav-link"><Link to={'/logout'}>Logout</Link></a>
                            }
                            </li>
                            {
                                !localStorage.getItem('currentUser')
                                &&
                                <li class="nav-item">
                                    <a className="nav-link"><Link to={'/register'}>Register</Link> </a>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
                <MyRoutes />
              </Router>
        )
    }
}

export default Navigation;