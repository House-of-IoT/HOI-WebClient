import React, { Component } from 'react'

export default class BasicStateListing extends Component<any,any> {
    render() {
        if(this.props.type == "Deactivated"){
            return (
                <div className = "basic-state-listing">
                    <h1>{this.props.data}</h1>
                    <button className = "basic-state-listing-button">Activate</button>
                </div>
            )
        }
        else{
            return (
                <div className = "basic-state-listing">
                    <h1>{this.props.data}</h1>
                </div>
            )
        }
    }
}
