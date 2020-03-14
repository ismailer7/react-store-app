import React, { Component } from "react";

import Footer from '../Footer';
import ShopList from '../../containers/ShopList';
import Navigation from '../Navigation';

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
                <Footer />
            </div>
        )
    }
}

export default Home;