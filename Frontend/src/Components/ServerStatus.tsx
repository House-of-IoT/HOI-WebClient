import React, { Component } from 'react'

export default class ServerStatus extends Component<any,any> {
    render() {

        return (
            <div className = "popup-wrapper">
                <div className = "server_status">
                    <h1>{this.props.status}</h1>
                    <p>{this.props.text}</p>
                    <button>OK</button>
                </div>
                
            </div>
        )
    }
}
