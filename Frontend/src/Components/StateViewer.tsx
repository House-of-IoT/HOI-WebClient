import React, { Component } from 'react'
import discord from '../Img/discord.png';
import github  from '../Img/github.png';
export default class StateViewer extends Component {
    render() {
        return (
            <div id= "state-viewer">
                <h1>Want to get involved?</h1>
                <img src = {discord}></img>
                <img src = {github}></img>
            </div>
        )
    }
}
