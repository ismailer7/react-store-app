import React, { Component } from 'react';
import './static/style.css';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer id="sticky-footer" class="py-2 bg-light text-white-50">
                    <div class="container text-center">
                    <small>Copyright &copy; United Remote Challenge</small>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;