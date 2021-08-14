import React, { Component } from 'react'
import discord from '../Img/discord.png';
import github  from '../Img/github.png';
export default class StateViewer extends Component {
    render() {
        return (
            <div id= "state-viewer">
                <h1>State Viewer</h1>
                <div id = "state-viewer-inner">
                    <button>Deactivated Bots</button>
                    <button>All Devices</button>
                    <button>Notification Contacts</button>
                    <button>Banned Ips</button>
                </div>
            </div>
        )
    }
}
