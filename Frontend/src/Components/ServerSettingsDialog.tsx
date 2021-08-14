import React, { Component } from 'react'
import SettingsOption from './SettingsOption'
export default class ServerSettingsDialog extends Component<any,any> {
    render() {
        if(this.props.config != null){
            let config = JSON.parse(this.props.config);
            console.log(config["disconnecting"])
            return (
                <div className = "popup-wrapper" id = "settings-dialog" style = {{display:(this.props.state? "block":"none")}}>
                    <div id = "settings-wrapper">
                        <h1>Configure Server Settings</h1>
                        <h3>Requires Administrator Status:</h3>
                        <SettingsOption 
                            set = {this.props.set} 
                            client = {this.props.client} 
                            status_type ="Deactivating" 
                            status = {String(config["disconnecting"])}
                            selected_server = {this.props.selected_server}/>
                        <SettingsOption 
                            set = {this.props.set} 
                            client = {this.props.client}  
                            status_type ="Activating" 
                            status = {String(config["activating"])}
                            selected_server = {this.props.selected_server}/>
                        <SettingsOption 
                            set = {this.props.set} 
                            client = {this.props.client}  
                            status_type ="Disconnecting" 
                            status = {String(config["deactivating"])}
                            selected_server = {this.props.selected_server}/>
                        <SettingsOption 
                            set = {this.props.set} 
                            client = {this.props.client}  
                            status_type ="Viewing State" 
                            status = {String(config["viewing"])}
                            selected_server = {this.props.selected_server}/>
                        <button id = "close-settings-dialog">X</button>

                    </div>
            
                </div>
            )
        }
        else{
            return (<div style = {{display:(this.props.state? "block":"none")}}></div>);
        }
    }
}
