
import React, { Component } from 'react';
import './static/index.css'

class Message extends Component {

    state = {
        message: "alert alert-success alert-dismissible fade show"
    }

    componentDidMount() {
        setTimeout(
            function() {
                this.setState({
                    message: "alert alert-success alert-dismissible fade show hidden",
                });
            }
            .bind(this),
            3000
        );
    }

    render() {
        return (
            <div class={this.state.message}>
                <strong>Success!</strong> Your message has been sent successfully.
                <button type="button" class="close" data-dismiss="alert">&times;</button>
            </div>
        )
    }

}

export default Message;