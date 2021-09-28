import React, { Component } from 'react'

export default class CapabilityListing extends Component<any,any> {
    render() {
        return (
            <div className = "capability-listing">
                <h1>{this.props.name}</h1>
                <button>Schedule</button>
            </div>
        )
    }
}
