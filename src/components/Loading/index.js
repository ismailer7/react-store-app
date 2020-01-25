import React, { Component } from "react";
import LoadingGif from './static/loading.gif'
import './static/style.css'

class Loading extends Component {

    state = {
        isLoading: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 6000);
    }

    render() {
        const isLoading = this.state.isLoading
        return (
            <div className="loading">
                {
                    isLoading
                    &&
                    <img alt="loading" src={LoadingGif} />
                }

                {
                    !isLoading
                    &&
                    <p className="error">
                        Sorry the server doesn't response, please check later!
                    </p>
                }
                
            </div>
        )
    }
}

export default Loading;