import React, { Component } from 'react'

export default class ConnectionListing extends Component<any,any> {
    render() {
        return (
            <div className ="connection-listing">
                
                <h3>{this.props.connection.name}</h3>
                <div className = "dot"></div>
            </div>
        )
    }
}
