import { type } from 'os';
import React, { Component } from 'react';
import HomeMonitor from './HomeMonitor';
import ReedSwitch from './ReedSwitch';


export default class BotList extends Component<any,any > {
    constructor(props:any){
        super(props);
        
    }

    render() {
        let keys = Object.keys(this.props.data)
        let type  = keys["type"]
        if( type == "home_monitor"){
            return (<HomeMonitor data = {this.props.data}/>);
        }
        else if(type == "reed_switch"){
            return (<ReedSwitch/>);
        }
    }}
