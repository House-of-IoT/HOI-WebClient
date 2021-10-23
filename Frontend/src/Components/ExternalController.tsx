import React, { Component } from 'react'

export default class ExternalController extends Component {
    render() {
        return (
            <div id = "ExternalControllerViewWrapper">
                <h2>External Controller</h2>
                <button>Add Connection</button>
                
                <h3>Connections:</h3>
                <div id = "ExternalControllerConnections">


                </div>

            </div>
        )
    }
}
