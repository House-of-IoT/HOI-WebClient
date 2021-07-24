import React, { Component } from 'react'
import SettingsOption from './SettingsOption'
export default class ServerSettingsDialog extends Component<any,any> {
    render() {
        return (
            <div className = "popup-wrapper" id = "settings-dialog" style = {{display:(this.props.state? "block":"none")}}>
                <div id = "settings-wrapper">
                    <h1>Configure Server Settings</h1>
                    <h3>Requires Administrator Status:</h3>
                    <SettingsOption status_type ="Deactivating" status = {this.props.deactivating_status.toString()}/>
                    <SettingsOption status_type ="Activating" status = {this.props.activating_status.toString()}/>
                    <SettingsOption status_type ="Disconnecting" status = {this.props.disconnecting_status.toString()}/>
                    <SettingsOption status_type ="Viewing State" status = {this.props.viewing_status.toString()}/>
                    <button id = "close-settings-dialog">X</button>

                </div>
        
            </div>
        )
    }
}
