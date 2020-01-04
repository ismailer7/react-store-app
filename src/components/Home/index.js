import React, { Component } from "react";
import ShopList from '../../containers/ShopList';

class Home extends Component {

    state = {
        isAuthenticate: false
    }

    render() {
        return (
            <div>
                <h1>
                   Near by Shop!
                </h1>
                <ShopList auth={this.state.isAuthenticate}/>
            </div>
        )
    }
}

export default Home;