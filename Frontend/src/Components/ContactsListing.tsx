import React, { Component } from 'react'

export default class ContactsListing extends Component<any,any> {
    render() {
        return (
            <div className = "contact-listing">
                <h2>{`${this.props.name}(${this.props.number})`}</h2>
                <button onClick = {()=>{
                    this.props.set({server_contacts_showing:false});
                    this.props.client.request_server_edit(this.props.selected_server,"remove-contact",JSON.stringify({"name":this.props.name,"number":this.props.number})
                    )
                    console.log("clicked")}}>Remove</button>
            </div>
        )
    }
}
