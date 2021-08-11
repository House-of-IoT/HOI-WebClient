import React, { Component } from 'react'
import greenicon  from "../Img/greenicon.png";
import settings_image from '../Img/setting.png';
export default class SnapShot extends Component<any,any> {
    render() {
        let types = new Set();
        for ( var data of this.props.bots){
            if(!types.has(data.type)){
                types.add(data.type);
            }
        }
        return (
            <div id = "snap-shot">
             <h1>SnapShot <img id = "icon-snapshot" src = {greenicon}></img></h1>
             <h2>Total bots:{this.props.bots.length}</h2>
             <h2>Different types: {types.size}</h2>   
             <h3>{this.props.server}</h3>
             <div id = "settings-button" onClick = {()=>{
                if( this.props.parent_state.selected_server != null){
                    this.props.set_parent_state({loading_content:true});
                    this.props.client.request_server_state_or_config(this.props.parent_state.selected_server,"server_config");
                }
                


             }}>
                <img src = {settings_image}></img>
                <h4>Edit Server Settings</h4>
             </div>
            </div>
        )
    }
}
