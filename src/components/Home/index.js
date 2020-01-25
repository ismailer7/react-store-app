import React, { Component } from "react";
import ShopList from '../../containers/ShopList';

class Home extends Component {

    // get user position using javascript
    componentDidMount() {
        // check if user is authenticate first
    }

    render() {
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