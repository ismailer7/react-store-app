import React, { Component } from "react";
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom';

const SingleShop = (props) => (
    <Link to={`/shop/${props.shop.place_id}`}>
        <li>
            {props.shop.name}
        </li>
    </Link>
)

class Preffered extends Component {

    state = {
        isFetching: false,
        prefferedStores: []
    }

    componentDidMount() {
        // get all preferred list for specific user.
        console.log('test preffered..')
        const userId = localStorage.getItem('currentUser')
        this.setState({
            isFetching: true
        })
        fetch(`http://localhost:8090/preferred/show?userId=${userId}`, { // this need to be authorized
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authorization')
            })}
        )
        .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    isFetching: false,
                    prefferedStores: json,
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const {isFetching, prefferedStores} = this.state;
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
                            prefferedStores.map(
                                store => {
                                    return (
                                        <div>
                                            <SingleShop shop={store} key={store.id}/>
                                            <button onClick={() => this.removeFromPreffered(store)}>Remove</button>
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

export default Preffered;