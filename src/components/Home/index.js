import React, { Component } from "react";
import ShopList from '../../containers/ShopList';

class Home extends Component {

    state = {
        isAuth: false,
        authoriization: ''
    }

    // get user position using javascript
    getUserLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("user position : " + position.coords.latitude + " and " + position.coords.longitude)
                }
            )
        }
    }

    componentDidMount() {
        // check if user is authenticate first
        this.getUserLocation()
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