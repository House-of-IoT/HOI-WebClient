import React, { Component } from 'react';
import logo from '../Img/bot.png';
import '../Css/main.css';
export default class MainHub extends Component {
    render() {
        return (
            <div className = "Main-Wrapper">
                <img  src = {logo}></img>
                <h1>House Of IoT</h1>
                
            </div>
        )
    }
}





