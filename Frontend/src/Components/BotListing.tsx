import { type } from 'os';
import React, { Component } from 'react';
import HomeMonitor from './HomeMonitor';
import ReedSwitch from './ReedSwitch';
import Ralph from './Ralph';
import MotionDetectionCamera from './MotionDetectionCamera';


export default class BotList extends Component<any,any > {
    constructor(props:any){
        super(props);
        
    }

    render() {
        let type  = this.props.bot["type"]
        if( type == "home_monitor"){
            return (<HomeMonitor data = {this.props.bot} device_name = {this.props.bot.device_name}/>);
        }
        else if(type == "reed_switch"){
            return (
            <ReedSwitch  
                state = {this.props.bot.state} 
                active_status = {this.props.bot.active_status}
                device_name = {this.props.bot.device_name}/>);
        }
        else if (type == "ralph"){
            return (<Ralph active_status = {this.props.bot.active_status} device_name = {this.props.bot.device_name}/>);
        }
        else{
            return (<MotionDetectionCamera/>)

        }
    }} 
