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
                    onClick= {()=>{this.props.set({loading_file:true})}}
                    onChange={(event)=>{this.connect_to_all(event)}}/>
            </div>
        )
    }
}
