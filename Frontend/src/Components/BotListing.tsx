import { type } from 'os';
import React, { Component } from 'react';
import HomeMonitor from './HomeMonitor';
import ReedSwitch from './ReedSwitch';
import Ralph from './Ralph';
import MotionDetectionCamera from './MotionDetectionCamera';
import GasFireSmoke from './GasFireSmoke';
import InfaredMotionDetector from './InfaredMotionDetector';


export default class BotList extends Component<any,any > {

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
        else if (type == "gas_fire_smoke"){
            return(<GasFireSmoke device_name = {this.props.bot.device_name} active_status = {this.props.bot.active_status}/>);
        }
        else if (type == "infared"){
            return (<InfaredMotionDetector 
                        device_name = {this.props.bot.device_name} 
                        active_status ={this.props.bot.active_status}
                        detections = {this.props.bot.times_sensed}
                        last_time_detected = {this.props.bot.last_sensed}/>);
        }
        else{
            return (<MotionDetectionCamera/>);

        }
    }} 
