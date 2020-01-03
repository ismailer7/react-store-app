import React, { Component } from 'react';


const SingleShop = (props) => (
    <li>
        {props.shop.name}
    </li>
)

class ShopList extends Component {

    state = {
        shops: [],
        isFetching: false
    }

    componentDidMount() {
        this.setState({
            isFetching: true
        })
        fetch('http://localhost:8080/places')
        .then(response => response.json())
        .then(json => {
            this.setState({
                isFetching: false,
                shops: json['results']
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        const {isFetching, shops} = this.state;
        return (
            <div>

                {
                    isFetching
                    &&
                    <p>Loading...</p>
                }

                {
                    !isFetching
                    &&
                    <ul>
                        {
                            shops.map(
                                shop => <SingleShop shop={shop} key={shop.id}/>
                            )
                        }
                    </ul>
                }
            </div>
        )
    }
}

export default ShopList;