import React, { Component } from 'react'

export default class ExternalControllerConditionView extends Component<any,any> {
    render() {
        return (
            <div className = "condition-view">
                <h1>{this.props.key_name}</h1>
                <h1>{this.props.key_value}</h1>
                <button>Edit</button>
            </div>
        )
    }
}
