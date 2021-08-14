import React, { Component } from 'react'

export default class SettingsOption extends Component<any,any> {


    bool_convert(bool:string){
        if(bool == "true"){
            return false
        }
        else{
            return true
        }
    }
    request_change(){
        this.props.set({server_settings_showing:false})
        if(this.props.status_type == "Activating"){
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_activating",this.bool_convert(this.props.status))
        }
        else if(this.props.status_type == "Deactivating"){
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_deactivating",this.bool_convert(this.props.status))
        }
        else if(this.props.status_type == "Disconnecting"){
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_disconnecting",this.bool_convert(this.props.status))
        }
        else{
            this.props.client.request_server_config_change(this.props.selected_server,"change_config_viewing",this.bool_convert(this.props.status))
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
