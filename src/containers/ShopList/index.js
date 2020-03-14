import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        authorization: '',
        userId: 0,
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
        if(this.props.auth) { // comming from redirect
            localStorage.setItem('currentUser', this.props.auth.id)
            localStorage.setItem('authorization', this.props.auth.authorization)
            this.setState({
                isAuthenticate: this.props.auth.isAuth,
                userId: this.props.auth.id,
                authorization: this.props.auth.authorization
            })
            console.log("is Authenticated", this.props.auth)
            if(this.props.auth.isAuth) {
                console.log("already authenticated.")
            }
            const userId = this.props.auth.id
            fetch(`http://localhost:8090/user/getPlaces?userId=${userId}`)
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
        } else if(localStorage.getItem('currentUser')) { // already logged in..
            // same requets getPlaces
            console.log("request from local storage..")
            const userId = localStorage.getItem('currentUser')
            console.log("user id from local storage", userId)
            this.setState({
                isAuthenticate: true,
                userId: userId
            })
            fetch(`http://localhost:8090/user/getPlaces?userId=${userId}`)
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
        } else { // guest
            fetch('http://localhost:8090/places')
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
    }

    /*
    removeFromNearBy = (shopId) => {
       console.log(shopId)
    } */

    addToPrefferedList = (shop) => {
        console.log('test')
        this.setState({
            isFetching: true
        })
        let authorization = null
        let userId = null
        if(this.props.auth) {
            console.log("check", this.props.auth)
            authorization = this.props.auth ?  this.props.auth.authorization : ''
            userId = this.props.auth ?  this.props.auth.id : -1
        } else if(localStorage.getItem('currentUser')) {
            authorization = localStorage.getItem('authorization') ? localStorage.getItem('authorization') : 'Basic Og=='
            userId = localStorage.getItem('currentUser')
        } else {
            userId = -1
            authorization = 'Basic Og=='
        }
        console.log("shop", shop)
        const obj = {
            "userId": userId,
            "storeId": shop.storeId
        }
        // console.log("add to preffered list: ", this.props.auth)
        fetch('http://localhost:8090/preferred/add', { // this need to be authorized
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': authorization
            }),
            body: JSON.stringify(obj)
        })
        .then(response => {
                this.setState({
                    isFetching: false
                })
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
                                            <SingleShop shop={shop} key={shop.place_id}/>
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