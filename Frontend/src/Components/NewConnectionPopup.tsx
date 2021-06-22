import React, { Component } from 'react'

export default class NewConnectionPopup extends Component<any,any> {
    render() {
        return (
            <div className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                <div id = "new-connection">
                    <h2>Add Connection</h2>
                    <input placeholder = "Ip"></input>
                    <input placeholder = "Port"></input>
                    <input placeholder = "Password"></input>
                    <button>Connect</button>
                </div>
                
            </div>
        )
    }
}
