import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading'
import PropTypes from 'prop-types'
import { withRouter } from "react-router";
import Message from '../../components/Message';

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
        message: ''
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        // this.getUserLocation()
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
            const userId = localStorage.getItem('currentUser')
            this.setState({
                isAuthenticate: true,
                userId: userId
            })
            fetch(`http://localhost:8090/user/getPlaces?userId=${userId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isFetching: false,
                    shops: json['results'],
                })
            })
            .catch(err => console.log(err))
        } else { // guest
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude
                        const longitude = position.coords.longitude
                        this.setState({
                            isFetching: true
                        })
                        fetch(`http://localhost:8090/places?latitude=${latitude}&longitude=${longitude}`)
                        .then(response => response.json())
                        .then(json => {
                            this.setState({
                                isFetching: false,
                                shops: json['results'],
                            })
                        })
                        .catch(err => console.log(err))
                    }
                )
            }
        }
    }

    
    removeFromNearBy = (shopId) => {
        this.setState({
            isFetching: true
        })
        if(!localStorage.getItem('currentUser')) {
            this.props.history.push('/login')
       } else {
            let obj = {
                'userId': localStorage.getItem('currentUser'),
                'storeId': shopId
            }
            fetch('http://localhost:8090/nearby/remove', { // this need to be authorized
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorization')
                }),
                body: JSON.stringify(obj)
            }).then(response => response.text())
            .then(text => {
                if(text === 'removed From Nearby') {
                    console.log('current nearby list: ', this.state.shops)
                    this.state.shops.forEach(nStore => {
                        if(nStore['storeId'] === shopId) {
                            this.state.shops.splice(this.state.shops.indexOf(nStore), 1)  
                            this.setState({
                                shops: this.state.shops,
                                isFetching: false
                            })
                        }
                    });
                }
            })
       }
    }

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
                if(response.status !== 200) {
                    // unauthorized proceed to login page.
                    this.props.history.push('/login')
                } else {
                    this.setState({
                        isFetching: false,
                        message: 'Added To Preferred List Successfully!'
                    })
                    return response.text()
                }
            }
        )
        .then(text => console.log(text))
        .catch(err => {
            console.log(err)
        })
        this.setState({
            message: ''
        })
    }

    render() {
        const {isFetching, shops, message} = this.state;
        return (
            <div>

            <div className="popup">
                {
                    message !== ''
                    &&
                    <Message msg={message}/>
                }

            </div>
            <div className="row">
                {
                    isFetching
                    &&
                   <Loading />
                }


                {
                    !isFetching
                    &&
                    <div style={{padding: "50px"}}>
                        {
                            shops.map(
                                shop => {
                                    return (

                                        <div class="card" style={{width: "18rem", padding: "10px"}}>
                                            <div class="card-body">
                                                <h5 class="card-title">{shop.name}</h5>
                                                <SingleShop shop={shop} key={shop.place_id}/>
                                                <button onClick={() => this.addToPrefferedList(shop)}>add</button><button onClick={() => this.removeFromNearBy(shop.storeId)}>remove</button>
                                            </div>
                                        </div>   
                                     
                                    )
                                }
                            )
                        }
                    </div>
                    
                }
            </div>
            </div>
        )
    }
}

export default withRouter(ShopList);