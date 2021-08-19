import React, { Component } from 'react'
import ContactsListing from './ContactsListing';

export default class ContactsPopup extends Component<any,any> {
    render() {
        if(this.props.data == null){
            return (
                <div className = "popup-wrapper">
                    <div id = "contact-popup">
                        <h1>Notification Contacts</h1>
                        <div id = "contact-listing-wrapper">
                            <h2>No Data</h2>
                        </div>
                        
                    </div>
                </div>
            )
        }
        else{
            let data  = JSON.parse(this.props.data);
            return (
                <div className = "popup-wrapper">
                    <div id = "contact-popup">
                        <h1>Notification Contacts</h1>
                        <div id = "contact-listing-wrapper">
                            {data.map((data:any)=>{
                                return(<ContactsListing data = {data} />);
                            })}
                        </div>
                        
                    </div>
                </div>
            )
        }
    }
}
