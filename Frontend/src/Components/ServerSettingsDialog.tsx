import React, { Component } from 'react'
import SettingsOption from './SettingsOption'
export default class ServerSettingsDialog extends Component<any,any> {
    render() {
        if(this.props.config != null){
            let config = JSON.parse(this.props.config);
            return (
                <div className = "popup-wrapper" id = "settings-dialog" style = {{display:(this.props.state? "block":"none")}}>
                    <div id = "settings-wrapper">
                        <h1>Configure Server Settings</h1>
                        <h3>Requires Administrator Status:</h3>
                        <SettingsOption status_type ="Deactivating" status = {config["disconnecting"]}/>
                        <SettingsOption status_type ="Activating" status = {config["activating"]}/>
                        <SettingsOption status_type ="Disconnecting" status = {config["deactivating"]}/>
                        <SettingsOption status_type ="Viewing State" status = {config["viewing"]}/>
                        <button id = "close-settings-dialog">X</button>

                    </div>
            
                </div>
            )
        }
    }
}
