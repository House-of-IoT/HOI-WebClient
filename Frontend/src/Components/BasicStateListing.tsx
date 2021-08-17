import React, { Component } from 'react'

export default class BasicStateListing extends Component<any,any> {
    render() {
        if(this.props.type == "Deactivated"){
            return (
                <div className = "basic-state-listing">
                    <h1>{this.props.data}</h1>
                    <button onClick = {()=>{
                        this.props.set({basic_state_showing:false})
                        this.props.client.request_bot_action(this.props.selected_server,this.props.data,"activate");
                    }} className = "basic-state-listing-button">Activate</button>
                </div>
            )
        }
        else{
            return (
                <div className = "basic-state-listing">
                    <h1>{this.props.data}</h1>
                </div>
            )
        }
    }
}
