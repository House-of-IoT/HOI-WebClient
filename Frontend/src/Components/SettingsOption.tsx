import React, { Component } from 'react'

export default class SettingsOption extends Component<any,any> {
    render() {
        return (
            <div className = 'settings-option'>
                <h2>{this.props.status_type}</h2>
                <button>{this.props.status}</button>
            
            </div>
        )
    }
}
