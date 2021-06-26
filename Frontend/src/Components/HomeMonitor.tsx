import React, { Component } from 'react'

export default class HomeMonitor extends Component<any,any> {
    render() {
        return (
            <div className = "home-monitor">
                <h2>{this.props.device_name}(Home-Monitor)</h2>
                <h3>Server:Home</h3>
                <h4>Detections(Last 24h):5</h4>
                <h4>Average Frame Rate : 60fps</h4>
                <h4>Average Cpu Usage(24h) :10.3% </h4>
                <button>View Live</button>    
                <button>View History</button>
            </div>
        )
    }
}
