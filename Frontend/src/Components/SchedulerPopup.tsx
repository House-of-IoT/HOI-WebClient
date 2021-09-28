import React, { Component } from 'react'
import CapabilityListing from './CapabilityListing';

export default class SchedulerPopup extends Component<any,any> {
    constructor(props:{}){
        super(props);
        this.state = {
            selected_capabilties:[],
            different_capabilities:{

            }
        }
    }

    render() {
        return (
            <div className = "popup-wrapper" id = "scheduler-popup">
                <div id = "scheduler-popup-inner"> 
                    <button id = "close-scheduler-popup">X</button>
                    <select name="" id="">
                        {Object.keys(this.props.bots).map((key)=>{
                            return <option onSelect = {()=>{this.setState({selected_capabilities:this.state.different_capabilities[key]})}}>{key}</option>
                        })}

                    </select>

                    <input placeholder = "Datetime"></input>
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
