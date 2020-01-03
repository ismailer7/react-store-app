import React, { Component } from "react";
import ShopList from '../../containers/ShopList';

class Home extends Component {

    render() {
        return (
            <div>
                <h1>
                   Near by Shop!
                </h1>
                <ShopList />
            </div>
        )
    }
}

export default Home;