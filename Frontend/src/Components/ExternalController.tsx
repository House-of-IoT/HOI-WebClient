import React, { Component } from 'react'

export default class ExternalController extends Component {
    render() {
        return (
            <div id = "ExternalControllerViewWrapper">
                <h2>External Controller</h2>

                <div id = "external-connections-bar">
                    <button>+</button>
                    <h3>Connections</h3>
                </div>
                

                
                <div id = "ExternalControllerConnections">


                </div>

            </div>
        )
    }
}
