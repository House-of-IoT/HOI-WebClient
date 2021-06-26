import React, { Component } from 'react'

export default class GasFireSmoke extends Component<any,any> {
    render() {
        return (
            <div className = "GasFireSmoke">
                <h2>{this.props.device_name}(GasFireSmoke)</h2>
                <h3>Server:Home</h3>
                <h4>Gas level:0</h4>
                <h4>Smoke level:0</h4>
                <h4>Fire? False</h4>
                <button style = {this.props.active_status? {backgroundColor:"red"}:{backgroundColor:"green"}}>
                    {this.props.active_status?  "Deactivate":"Activate" }</button>
            </div>
        )
    }
}
