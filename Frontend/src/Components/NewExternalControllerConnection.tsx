import React, { Component } from 'react'

export default class NewExternalControllerConnection extends Component {
    render() {
        return (
            <div>
                <h1>Add External Controller Connection</h1>
                <input placeholder= "host"></input>
                <input placeholder= "port"></input>
                <input placeholder= "display name"></input>
                <input placeholder = "name on server"></input>
            </div>
        )
    }
}
