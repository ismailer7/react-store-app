import React, { Component } from "react";
import LoadingGif from './loading.gif'

class Loading extends Component {

    render() {
        return (
            <div>
                <img alt="loading" src={LoadingGif} />
            </div>
        )
    }
}

export default Loading;