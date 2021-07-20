import React, { Component } from 'react'

export default class InfaredMotionDetector extends Component<any,any> {
    render() {
        return (
            <div className = "infared">
                <h2>{this.props.name}(InfaredMotionDetector)</h2>
                <h4>{this.props.detections}</h4>
                <h4>{this.props.last_time_detected}</h4>
                <button style = {this.props.active_status? {backgroundColor:"red"}:{backgroundColor:"green"}}>
                    {this.props.active_status?  "Deactivate":"Activate" }</button>
            </div>
        )
    }
}
