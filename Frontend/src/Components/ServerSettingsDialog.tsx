import React, { Component } from 'react'
import SettingsOption from './SettingsOption'
export default class ServerSettingsDialog extends Component<any,any> {
    render() {
        return (
            <div className = "popup-wrapper" id = "settings-dialog">
                <h1>Configure Server Settings</h1>
                <h2>Requires Administrator Status:</h2>
                <SettingsOption status_type ="Deactivating" status = {this.props.deactivating_status}/>
                <SettingsOption status_type ="Activating" status = {this.props.activating_status}/>
                <SettingsOption status_type ="Disconnecting" status = {this.props.disconnecting}/>
                <SettingsOption status_type ="Viewing State" status = {this.props.viewing_state}/>
            </div>
        )
    }
}
