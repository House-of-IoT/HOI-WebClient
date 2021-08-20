import React, { Component } from 'react'
import ContactsListing from './ContactsListing';
import look from "../Img/look.svg";


export default class ContactsPopup extends Component<any,any> {
    render() {

        if(this.props.data == "" || Object.keys(JSON.parse(this.props.data)).length == 0){
            return ( 
                <div className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                    <div id = "contact-popup">
                        <h1>Notification Contacts</h1>
                        <button  id = "close-basic-state" onClick = {()=>{this.props.set({servers_contacts_showing:false})}}>X</button>
                        <div id = "contact-listing-wrapper">
                            <img src = {look}></img>
                            <h2>No Data</h2>
                            <button id = "add-contact-button">Add</button>
                        </div>
                        
                    </div>
                </div>
            )
        }
        else{
            let parsed_data = JSON.parse(this.props.data);
            let keys  = Object.keys(parsed_data);
            return (
                <div className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                    <div id = "contact-popup">
                        <h1>Notification Contacts</h1>
                        <button  id = "close-contact-state" onClick = {()=>{this.props.set({servers_contacts_showing:false})}}>X</button>
                        <div id = "contact-listing-wrapper">
                            {keys.map((key:any)=>{
                                return(<ContactsListing data = {`${key}(${parsed_data[key]})`} />);
                            })}
                        </div>
                        
                    </div>
                </div>
            )
        }
    }
}
