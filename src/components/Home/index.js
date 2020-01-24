import React, { Component } from "react";
import ShopList from '../../containers/ShopList';

class Home extends Component {

    state = {
        isAuth: false,
        authoriization: ''
    }

    componentDidMount() {
        // check if user is authenticate first
    }

    render() {
        const isAuth = this.state.isAuth
        return (
            <div>
                <h1>
                   Near by Shop!
                </h1>
                <ShopList auth={this.props.location.credentials}/>  
            </div>
        )
    }
}

export default Home;