import React, { Component } from "react";
import LoadingGif from './static/loading.gif'

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
            <div>
                {
                    isLoading
                    &&
                    <img alt="loading" src={LoadingGif} />
                }

                {
                    !isLoading
                    &&
                    <p>
                        Sorry the server doesn't response, please check later!
                    </p>
                }
                
            </div>
        )
    }
}

export default Loading;