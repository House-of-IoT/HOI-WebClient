import { stringify } from 'querystring';
import React, { Component } from 'react'
import greenicon  from "../Img/greenicon.png";
import settings_image from '../Img/setting.png';
export default class SnapShot extends Component<any,any> {

    constructor(props:{}){
        super(props);
        this.state = {
            date_message:"Not Updated Yet"
        };
    }


    componentDidMount(){
        //keep updating date message every half second
        setInterval(()=>{this.setState({date_message:this.date_message()})},500)
    }

    date_message():String{
        let then : Date = this.props.last_date;
        let now : Date = new Date();

        let difference_in_mil = now.getTime() - then.getTime();
        let difference_in_seconds = Math.floor( difference_in_mil/1000);
        let formatted_difference_in_seconds = `${difference_in_seconds}s `;
        return formatted_difference_in_seconds
    }f

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
             <h2>Updated {this.state.date_message} ago</h2>
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
