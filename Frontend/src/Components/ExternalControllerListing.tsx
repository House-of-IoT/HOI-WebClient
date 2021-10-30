import React, { Component } from 'react'

export default class ExternalControllerListing extends Component<any,any> {
    render() {
        return (
            <div className = "external-controller-server-listing">
                <h1>{this.props.name}</h1>
                <button >Open</button>
            </div>
        )
    }
}
