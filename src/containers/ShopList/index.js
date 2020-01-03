import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading'

const SingleShop = (props) => (
    
    <Link to={`/shop/${props.shop.place_id}`}>
        <li>
            {props.shop.name}
        </li>
    </Link>
    
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
            console.log(json)
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
                   <Loading />
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