import React, { Component } from 'react'

export default class ExternalControllerConditionView extends Component<any,any> {
    render() {
        return (
            <div className = "condition-view">
                <h3 className = "condition-keys">KEY:{this.props.key_name}</h3>
                <h3 className = "condition-values">VALUE:{this.props.key_value}</h3>
                <button 
                    id = "condition-edit-button" 
                    className = "condition-modify-buttons">Edit</button>
                <button
                    id = "condition-remove-button" 
                    className = "condition-modify-buttons">Remove</button>
            </div>
        )
    }
}
