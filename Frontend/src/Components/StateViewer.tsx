import React, { Component } from 'react'

export default class StateViewer extends Component<any,any> {
    render() {
        return (
            <div id= "state-viewer">
                <h1>State Viewer</h1>
                <div id = "state-viewer-inner">
                    <button onClick = {()=>{
                        this.props.set({type_of_basic_state:"Deactivated",loading_content:true});
                        this.props.client.request_server_state_or_config(this.props.selected_server,"servers_deactivated_bots");
                    }}> Deactivated Bots</button>
                    <button>All Devices</button>
                    <button>Notification Contacts</button>
                    <button>Banned Ips</button>
                </div>
            </div>
        )
    }
}
