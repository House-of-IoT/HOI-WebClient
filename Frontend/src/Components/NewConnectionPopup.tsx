import React, { Component, FormEventHandler } from 'react'

export default class NewConnectionPopup extends Component<any,any> {
    constructor(){
        super({});
        this.state = {
            host:"",
            port:"",
            password:"",
            server_name:""
        }

    }
    check_fields_and_try_to_setup_connection(){
        if(this.state.port.length == 0 || this.state.host.length < 7){
            alert("Please make sure that the credentials are correct!");
        }
        else{
            if(this.props.client.connections.has(this.state.server_name)){
                alert("A connection by this name already exists!");
            }
            else{
                //this.props.client.setup_connection()
            }
        
        }
    }

    render() {
        return (
            <div className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                <div id = "new-connection">
                    <h2>Add Connection</h2>
                    <input placeholder = "Server Name"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({server_name:event.currentTarget.value})}}></input>

                    <input placeholder = "Host"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({host:event.currentTarget.value})}}></input>
                    <input placeholder = "Port"onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({port:event.currentTarget.value})}}></input>
                    <input placeholder = "Password" onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>{this.setState({password:event.currentTarget.value})}}></input>
                    <button id = "connect-button" >Connect</button>
                    <button id = "close-new-connection" onClick = {()=>{this.props.set({new_showing:false})}}>X</button>
                </div>
                
            </div>
        )
    }
}
