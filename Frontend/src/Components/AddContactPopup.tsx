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
            <div id = "add-contact-popup" className = "popup-wrapper">
                <div id = "add-contact-inputs">
                    <button >X</button>
                    <h1>Add Contact</h1>
                    
                    <input placeholder = "Name"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({name:event.currentTarget.value})}}></input>
                    <input placeholder = "Number"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({number:event.currentTarget.value})}}></input>
                </div>
                <button>Confirm</button>
            </div>
        )
    }
}
