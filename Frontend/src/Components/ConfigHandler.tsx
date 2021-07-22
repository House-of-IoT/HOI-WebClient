import React, { ChangeEvent, Component } from 'react'

export default class ConfigHandler extends Component<any,any> {

    connect_to_all(event:ChangeEvent<HTMLInputElement>){
        let file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = (event:any)=>{
            let connections = JSON.parse(event.target.results);
            for(var connection of connections.connections){
                var password = window.prompt(`Password for '${connection.server_name}:'` )
                this.props.client.setup_connection(connection.server_name,connection.connection_string,password);
            }
        };
        reader.readAsText(file);
    }

    render() {
        return (
            <div id = "config-handler">
                <h1>Manage Configuration</h1>
                <button className = "config-buttons">Save</button>
                <button className = "config-buttons">Insert New</button>
                <button  id= "remove-current-config"className = "config-buttons">Remove</button>
                <input 
                    type="file" 
                    id="chosen-file" 
                    name="chosen-file" 
                    accept="audio/mp3" 
                    className="audio-selector" 
                    onClick= {this.props.set()}
                    onChange={(event)=>{this.connect_to_all(event)}}/>
            </div>
        )
    }
}
