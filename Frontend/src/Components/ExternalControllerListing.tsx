import React, { Component } from 'react'

export default class ExternalControllerListing extends Component<any,any> {
    render() {
        return (
            <div className = "external-controller-server-listing">
                <h1>{this.props.name}</h1>
                <button className = "external-controller-server-listing-view-button">View</button>
                <button className = "external-controller-server-listing-disconnect-button">Disconnect</button>    
            </div>
        )
    }
}
