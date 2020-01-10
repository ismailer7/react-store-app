import React, { Component } from "react";


class Register extends Component {



    render() {
        const username = 'drake'
        const password = 'pass'
        const encode = new Buffer(username + ':' + password).toString('base64');
        return (
            <div>
                <h1>
                    Registration Page!<br/>
                    <h1>{encode}</h1>
                </h1>
            </div>
        )
    }
}

export default Register;