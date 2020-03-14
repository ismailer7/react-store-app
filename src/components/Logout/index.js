import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {


    componentDidMount() {
        console.log('logout component...')
        localStorage.clear();
        return <Redirect 
        to = {{
            pathname: '/',
        }}
        />
    }

   

    render() {
        return(
            <div>
                <h1>
                    Log out
                </h1>
            </div>
        )
    }
}

export default Logout;