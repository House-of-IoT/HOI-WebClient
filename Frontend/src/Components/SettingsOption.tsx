import React, { Component } from 'react'

export default class SettingsOption extends Component<any,any> {

    request_change(){
        this.props.set({server_settings_showing:false})
        let bool = new Boolean(this.props.status)
        if(this.props.status_type == "Activating"){
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_activating",!bool)
        }
        else if(this.props.status_type == "Deactivating"){
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_deactivating",!bool)
        }
        else if(this.props.status_type == "Disconnecting"){
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_disconnecting",!bool)
        }
        else{
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_viewing",!bool)
        }
    }

    render() {
        return (
            <div className = 'settings-option'>
                <h2>{this.props.status_type}</h2>
                <button onClick = {()=>{
                    this.request_change()}}
                 >{this.props.status}</button>

            </div>
        )
    }
}
