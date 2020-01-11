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
        isAuthenticate: false
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        //console.log('store list component : ', this.props)

        this.setState({
            isFetching: true
        })
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

    /* addToPrefferedList = (event) => {
        console.log('tried to add..')
    }

    removeFromNearBy = (shopId) => {
       console.log(shopId)
    } */

    fetchingAPI = (token) => {
        this.setState({
            isFetching: true
        })
        fetch(`http://localhost:8080/places?pageToken=${token}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                isFetching: false,
                shops: json['results'],
                nextPageToken: json['next_page_token'],
                previousPageToken:  json['previous_page_token']
            })
        })
        .catch(err => console.log(err))
    }

    /* checkForAuth = () => {
        if(!this.props.auth) {
            return <Redirect to='/login'  />
        }
    } */

    addToPrefferedList = (shopId) => {
        const authorization = this.props.auth ?  this.props.auth.authorization : ''
        fetch('http://localhost:8080/something', { // this need to be authorized
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': authorization
            })
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
                                shop => {
                                    return (
                                        <div>
                                            <SingleShop shop={shop} key={shop.id}/>
                                            <button onClick={() => this.addToPrefferedList(shop.id)}>add</button><button onClick={() => this.removeFromNearBy(shop.id)}>remove</button>
                                        </div>
                                    )
                                    
                                }
                            )
                        }
                    </ul>
                }

               {/*  {
                    !previousPageToken && nextPageToken
                    &&
                    <div>
                        <button disabled="true"> prev </button> <button onClick={() => this.onNext(nextPageToken)}> next </button>
                    </div>
                }

                {
                    previousPageToken && nextPageToken
                    &&
                    <div>
                        <button onClick={() => this.onPrevious(previousPageToken)}> prev </button> <button onClick={() => this.onNext(nextPageToken)}> next </button>
                    </div>
                }

                {
                    previousPageToken && !nextPageToken
                    &&
                    <div>
                        <button onClick={() => this.onPrevious(previousPageToken)}> prev </button> <button disabled="true"> next </button>
                    </div>
                }

                {
                    !previousPageToken && !nextPageToken
                    &&
                    <div>
                        <button disabled="true"> prev </button> <button disabled="true"> next </button> 
                    </div> 
                } */}
            </div>
        )
    }
}

export default withRouter(ShopList);