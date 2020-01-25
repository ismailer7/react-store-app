import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../components/Loading'
import PropTypes from 'prop-types'
import { withRouter } from "react-router";

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
        isFetching: false,
        isAuthenticate: false,
        latitude: 0,
        longitude: 0
    }

    static contextTypes = {
        router: PropTypes.object
    }

    getUserLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("user position : " + position.coords.latitude + " and " + position.coords.longitude)
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    const isFetching = true
                    this.setState({
                        latitude,
                        longitude,
                        isFetching
                    })
                }
            )
        }
    }

    componentDidMount() {
        this.getUserLocation()
        //console.log('store list component : ', this.props)
        /* this.setState({
            isFetching: true
        }) */
        fetch('http://localhost:8080/places')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            console.log(json['results'].length)
            this.setState({
                isFetching: false,
                shops: json['results'],
            })
        })
        .catch(err => console.log(err))
    }

    /*
    removeFromNearBy = (shopId) => {
       console.log(shopId)
    } */

    addToPrefferedList = (shop) => {
        const authorization = this.props.auth ?  this.props.auth.authorization : ''
        const userId = this.props.auth ?  this.props.auth.id : -1
        console.log("shop", shop)
        console.log("add to preffered list: ", this.props.auth)
        fetch(`http://localhost:8080/add/store?id=${userId}`, { // this need to be authorized
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': authorization
            }),
            body: JSON.stringify(shop)
        })
        .then(response => {
                if(response.status !== 200) {
                    // unauthorized proceed to login page.
                    this.props.history.push('/login')
                } else {
                    return response.text()
                }
            }
        )
        .then(text => console.log(text))
        .catch(err => {
            console.log(err)
        })
       /* if(!this.props.auth) {
           this.props.history.push('/login')
       } else {
           console.log('proceeed to next page')
       } */
    }

    render() {
        const {isFetching, shops} = this.state;
        return (
            <div className="row">
                {
                    isFetching
                    &&
                   <Loading />
                }

                {
                    !isFetching
                    &&
                    <div>
                        {
                            shops.map(
                                shop => {
                                    return (
                                        <div>
                                            <SingleShop shop={shop} key={shop.id}/>
                                            <button onClick={() => this.addToPrefferedList(shop)}>add</button><button onClick={() => this.removeFromNearBy(shop.id)}>remove</button>
                                        </div>
                                    )
                                    
                                }
                            )
                        }
                    </div>
                    
                }
            </div>
        )
    }
}

export default withRouter(ShopList);