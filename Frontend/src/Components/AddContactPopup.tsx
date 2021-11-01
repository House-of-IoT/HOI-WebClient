import React, { Component } from 'react'

export default class AddContactPopup extends Component<any,any> {
    constructor(props:{}){
        super(props);
        this.state = {
            number:"",
            name:"",
        }
    }

    render() {
        
        return (
            <div id = "add-contact-popup" className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                <div id = "add-contact-inputs">
                    <button id = "close-add-contact"  onClick ={()=>{this.props.set({add_contacts_showing:false})}}>X</button>
                    <h1>Add Contact</h1>
                    
                    <input placeholder = "Name"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({name:event.currentTarget.value})}}></input>
                    <input placeholder = "Number"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({number:event.currentTarget.value})}}></input>
                </div>
                <button id = "confirm-add-contact" onClick = {()=>{ 
                    this.props.set({add_contacts_showing:false});
                    this.props.client.request_server_edit(this.props.selected_server,"add-contact",JSON.stringify({"name":this.state.name,"number":this.state.number}));}}>Confirm</button>
            </div>
        )
    }
}
