import React, { Component } from 'react';
import CapabilityListing from './CapabilityListing';
import { ActionCapabilities } from '../Functionality/capabilities';
import DateTimePicker from 'react-datetime-picker';

export default class SchedulerPopup extends Component<any,any> {
    constructor(props:{}){
        super(props);
        this.state = {
            selected_capabilities:[],
            different_capabilities:ActionCapabilities,
            value_date : new Date()
        }
    }

    render() {
        return (
            <div className = "popup-wrapper" id = "scheduler-popup"  style = {{display:(this.props.state? "block":"none")}}>
                <div id = "scheduler-popup-inner"> 
                    <button id = "close-scheduler-popup">X</button>
                    <h1 id = "Select-label"> Select Bot For Scheduling</h1>
                    <select name="" id="scheduler-popup-inner-select">
                        <option  selected  disabled >Choose Bot</option>
                        {Object.keys(this.props.bots).map((bot)=>{
                            return <option onSelect = {()=>{this.setState({selected_capabilities:this.state.capabilities[bot["type"]]})}}>{bot["device_name"]}</option>
                        })}

                    </select>

                        <DateTimePicker className = "date-picker-comp" 
                        value = {this.state.value_date} 
                    />
                  
                    <h2 id = "select-action-label-for-scheduling">Select the wanted action</h2>
                    <div id = "scheduling-capabilities">
                        {this.state.selected_capabilities.map((capabilitiy)=>{
                            return <CapabilityListing name = {capabilitiy}/>
                        })}
                    </div>               
                </div>                
            </div>
        )
    }
}
