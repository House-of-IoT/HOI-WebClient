import React, { Component } from 'react'

export default class Ralph extends Component<any,any> {
    render() {
        return (
            <div className = "ralph">
                <h2>{this.props.device_name}(Ralph)</h2>
                <h3>Server: Home</h3>
                <button  style ={this.props.active_status? {backgroundColor:"red"}:{backgroundColor:"green"}} 
                className = "ralph-activate-button"> {this.props.active_status?  "Deactivate":"Activate" }</button>
                <button className = "ralph-control-button">Control</button>
            </div>
        )
    }
}
