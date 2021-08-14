import React, { Component } from 'react'

export default class BasicStateListPopup extends Component<any,any> {
    render() {
        return (
            <div id = "basic-state-list">
                <h1>{this.props.name}</h1>
                <div id = "basic-state-data">

                </div>

            </div>
        )
    }
}
