import React, { Component } from 'react'

export default class ReedSwitch extends Component<any,any> {
    render() {
        return (
            <div className = "reed-switch">
                <h1 > 
                {this.props.state? "Open!!" : "Closed"}</h1>
                <h3>{this.props.device_name}(Reed Switch)</h3>
                <h3>Server:Home</h3>
                <button style = {this.props.active_status? {backgroundColor:"red"}:{backgroundColor:"green"}}>
                    {this.props.active_status?  "Deactivate":"Activate" }</button>
            </div>
        )
    }
}
//#242c37