import React, { ChangeEvent, Component } from 'react'

export default class ConfigHandler extends Component<any,any> {
    //credit for export to json function : Jonathan Michalik via stack overflow
    exportToJson(objectData) {
        let filename = "export.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
          navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          var a = document.createElement('a');
          a.download = filename;
          a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }

    connect_to_all(event:ChangeEvent<HTMLInputElement>){
        this.props.set({loading_file:false});
        let file = event.target.files[0]
        const reader = new FileReader();
       
        reader.onloadend = (event:any)=>{
            try{
                let connections = JSON.parse(event.target.result);
                for(var connection of connections.connections){
                    var password = window.prompt(`Password for '${connection.server_name}:'` );
                    var name = window.prompt(`Name for ${connection.server_name}:`);
                    this.props.client.set_name_and_type( connection.server_name,JSON.stringify({name:name,type:"non-bot"}));
                    this.props.client.setup_connection(connection.server_name,connection.connection_string,password);
                }
            }
            catch{
                this.props.set({failed_action_message:"Incorrectly formatted JSON!",failed_action_showing:true});
            }
        };
        reader.readAsText(file);
    }

    create_new_config_file(){
        let server_names = Array.from(this.props.client.connections.keys());
        let holder = {connections:[]}
        for(var server_name of server_names){
            let connection_string = this.props.client.connection_strings.get(server_name);
            holder.connections.push({server_name:server_name,connection_string:connection_string});
        }
        this.exportToJson(holder);
    }

    render() {
        return (
            <div id = "config-handler">
                <h1>Manage Configuration</h1>
                <button className = "config-buttons" onClick = {()=>{this.create_new_config_file()}}>Save</button>
                <button className = "config-buttons" onClick= {()=>{document.getElementById("chosen-file").click()}}>Insert New</button>
                <button  id= "remove-current-config"className = "config-buttons">Remove</button>
                <input 
                    type="file" 
                    id="chosen-file" 
                    name="chosen-file" 
                    accept="json" 
                    className="audio-selector" 
                    onClick= {()=>{this.props.set({loading_file:true})}}
                    onAbort = {()=>{this.props.set({loading_file:false})}}
                    onChange={(event)=>{this.connect_to_all(event)}}/>
            </div>
        )
    }
}
