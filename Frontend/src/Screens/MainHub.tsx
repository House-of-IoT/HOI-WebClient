import React, { Component } from 'react';
import logo from '../Img/bot.png';
import '../Css/main.css';
import ListingHub from '../Components/ListingHub';
import Connections from '../Components/ConnectionsList';
import SnapShot from '../Components/SnapShot';
import ConfigHandler from '../Components/ConfigHandler';
import GetInvolved from '../Components/GetInvolved';
import RemovalConfirmPopup from '../Components/RemovalConfirmPopup';
import NewConnectionPopup from '../Components/NewConnectionPopup';
import { AudioHandler } from '../Functionality/audio';
import { Client } from '../Functionality/client';

export default class MainHub extends Component<any,any> {

    audio_handler : AudioHandler;
    state : any;
    client : Client;

    constructor(){
        super({});
        this.audio_handler = new AudioHandler();
        this.state = {
            //list of objects , but for now just mock data
            connections : [
                { name : "Ralph Server"},
                { name : "General"}
            ],
            types : new Set(),
            bots : 0,
            removal_showing: false,
            new_showing : false
        }    
        this.setState = this.setState.bind(this);
        this.client = new Client();
    }
    
    componentDidMount(){
        this.audio_handler.play()
    }
    render() {
        
        return (
            <div className = "Main-Wrapper">
                <img  src = {logo}></img>
                <h1>House Of IoT</h1>
                <ListingHub/>
                <input id = "bot-search" placeholder = "Search By Name"></input>
                <Connections connections = {this.state.connections}/>
                <SnapShot bots = {this.state.bots}  types = {this.state.types}/>
                <ConfigHandler/>
                <GetInvolved/>
                <RemovalConfirmPopup state = {this.state.removal_showing} set = {this.setState}/>
                <NewConnectionPopup state = {this.state.new_showing} set = {this.setState} />
            </div>
        )
    }
}