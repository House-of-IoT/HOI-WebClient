import React, { Component } from 'react'

export default class ContactsListing extends Component<any,any> {
    render() {
        return (
            <div className = "contact-listing">
                <h2>{this.props.data}</h2>
                <button>Remove</button>
            </div>
        )
    }
}
