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
        if(!localStorage.getItem('currentUser')) {
            this.props.history.push('/login')
        } else {
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
                if(json.status === 401) { // unauthorized.
                    this.props.history.push('/login')
                } else {
                    console.log(json)
                    this.setState({
                        isFetching: false,
                        prefferedStores: json,
                    })
                }
                // console.log('preferred stores: ', this.state.prefferedStores)
            })
            .catch(err => console.log(err))
        } 
    }


    removeFromPreffered(storeId) {
        console.log('available stores,', this.state.prefferedStores)
        let bean = {
            "userId": localStorage.getItem('currentUser'),
            "storeId": storeId
        }
        fetch('http://localhost:8090/preferred/remove', { // this need to be authorized
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorization')
                }),
                body: JSON.stringify(bean)
            }
        ).then(response => response.text())
        .then(text => {
            console.log(text)
            if(text === 'removed Successfully From Preferred List!') {
                console.log('removeing..')
                this.state.prefferedStores.forEach(pStore => {
                    if(pStore['storeId'] === storeId) {
                        this.state.prefferedStores.splice(this.state.prefferedStores.indexOf(pStore), 1)  
                        this.setState({
                            prefferedStores: this.state.prefferedStores
                        })
                    }
                });
            }
        })
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
                                            <SingleShop shop={store} key={store['storeId']}/>
                                            <button onClick={() => this.removeFromPreffered(store['storeId'])}>Remove</button>
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