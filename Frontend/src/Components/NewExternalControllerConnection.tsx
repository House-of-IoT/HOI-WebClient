import React, { Component } from 'react'

export default class NewExternalControllerConnection extends Component {
    render() {
        return (
            <div>
                <button>X</button>
                <h1>Add External Controller Connection</h1>
                <input placeholder= "Host"></input>
                <input placeholder= "Port"></input>
                <input placeholder= "Server's Name"></input>
                <input placeholder = "Name On Server"></input>
                <button>Connect</button>
            </div>
        )
    }
}
