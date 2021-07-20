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
                    <button id = "connect-button">Connect</button>
                    <button id = "close-new-connection" onClick = {()=>{this.props.set({new_showing:false})}}>X</button>
                </div>
                
            </div>
        )
    }
}
