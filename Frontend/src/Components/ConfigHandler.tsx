import React, { Component } from 'react'

export default class ConfigHandler extends Component {
    render() {
        return (
            <div id = "config-handler">
                <h1>Manage Configuration</h1>
                <button className = "config-buttons">Save</button>
                <button className = "config-buttons">Insert New</button>
                <button  id= "remove-current-config"className = "config-buttons">Remove</button>
               
            </div>
        )
    }
}
