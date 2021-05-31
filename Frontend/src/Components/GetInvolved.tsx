import React, { Component } from 'react'
import discord from '../Img/discord.png';
import github  from '../Img/github.png';
export default class GetInvolved extends Component {
    render() {
        return (
            <div id= "get-involved">
                <h1>Want to get involved?</h1>
                <img src = {discord}></img>
                <img src = {github}></img>
            </div>
        )
    }
}
