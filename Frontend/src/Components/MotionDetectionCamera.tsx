import React, { Component } from 'react'

export default class MotionDetectionCamera extends Component<any,any> {
    render() {
        return (
            <div className = "MotionDetectionCamera">
                <h1>{this.props.bot.name}</h1>
                <h3>Last Detection:{this.props.bot.last_detection}</h3>
                <button>Deactivate</button>
                <button>View Recent Detections</button>
            </div>
        )
    }
}
