import React, { Component } from "react";
import Loading from '../Loading';

class ShopDetail extends Component {

    state = {
        placeInfo: {},
        isFetching: false
    }

    componentDidMount() {
        const placeId = this.props.match.params.placeId
        this.setState({
            isFetching: true
        })
       fetch(`http://localhost:8080/place?placeID=${placeId}`)
       .then(response => response.json())
       .then(json => {
            console.log(json['result'])
            this.setState({
                placeInfo: json['result'],
                isFetching: false
            })
        })
    }

    render() {
        const {icon, name, types, vicinity} = this.state.placeInfo
        const isFetching = this.state.isFetching
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
                    <div>
                        <h1>
                            Shop Detail page!
                        </h1>
                        <p><img alt="store icon" src={`${icon}`}/></p>
                        <p>{name}</p>
                        <p>{vicinity}</p>

                        {
                            typeof(types) !== "undefined"
                            &&
                            <ul>
                               {types.map( (type, index) => <li key={index}>{type}</li>)}
                            </ul>
                        }
                    </div>
                }    
            </div>
        )
    }
}

export default ShopDetail;