import React, { Component } from 'react';
import logo from '../Img/bot.png';
import '../Css/main.css';
import ListingHub from '../Components/ListingHub';
import Connections from '../Components/ConnectionsList';
export default class MainHub extends Component<any,any> {


    constructor(){
        super({});
        this.state = {
            //list of objects , but for now just mock data
            connections : [
                { name : "Ralph Server"},
                { name : "General"}
            ]
        }    
    }
    render() {
        return (
            <div className = "Main-Wrapper">
                <img  src = {logo}></img>
                <h1>House Of IoT</h1>
                <ListingHub/>
                <input id = "bot-search" placeholder = "Search By Name"></input>
                <Connections connections = {this.state.connections}/>
            </div>
        )
    }
}