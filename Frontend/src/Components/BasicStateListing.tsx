import React, { Component } from 'react'

export default class BasicStateListing extends Component<any,any> {
    render() {
        return (
            <div className = "basic-state-listing">
                <h1>{this.props.data}</h1>
            </div>
        )
    }
}
