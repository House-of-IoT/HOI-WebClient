import React, { Component } from 'react'

export default class ConnectionListing extends Component<any,any> {
    render() {
        return (
            <div className ="connection-listing">
                <div className = "dot"></div>
                <h1>{this.props.connection.name}</h1>
            </div>
        )
    }
}
