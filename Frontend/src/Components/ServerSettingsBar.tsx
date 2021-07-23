import React, { Component } from 'react'
import settings_image from '../Img/setting.png';
export default class ServerSettingsBar extends Component {
    render() {
        return (
            <div  id = "settings-bar">
                <img src = {settings_image}></img>
                <h3>Edit Server Settings</h3>
            </div>
        )
    }
}
