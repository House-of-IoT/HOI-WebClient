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
import { Test } from '../Functionality/clienttesting';
import ServerStatus from '../Components/ServerStatus';
import Loading from '../Components/Loading';
export default class MainHub extends Component<any,any> {

    audio_handler : AudioHandler;
    state : any;
    client:Client
    test:Test

    constructor(){
        super({});
        this.audio_handler = new AudioHandler();
        this.state = {
            //list of objects , but for now just mock data
            connection_names : [],
            removal_showing: false,
            new_showing : false,
            selected_server: null,
            selected_bots : [],//when a server is selected these will be the main bots
            server_bot_strings : new Map<string,string>(), // all passive bot data from one server stored in one string.
            successful_action_showing:false,
            failed_action_showing:false,
            //mock values, not really the messages
            failed_action_message:"Server Responded with failure to your authentication request.",
            successful_action_message:"Server Responded with success to your authentication request.",
            loading_file:false
        }    
        this.setState = this.setState.bind(this);
        this.test = new Test(this.setState);
        this.client = new Client();
    }

    componentDidMount(){
        this.audio_handler.play();
        this.client.define_parent_state(this.setState);
    }


    render() {
        return (
            <div className = "Main-Wrapper">
                <img  src = {logo}></img>
                <h1>House Of IoT</h1>
                <ListingHub bots = {this.state.selected_bots}/>
                <input id = "bot-search" placeholder = "Search By Name"></input>
                <Connections set = {this.setState} connections = {this.state.connection_names}/>
                <SnapShot bots = {this.state.selected_bots}/>
                <ConfigHandler client = {this.client} set = {this.setState}/>
                <GetInvolved/>
                <RemovalConfirmPopup state = {this.state.removal_showing} set = {this.setState}/>
                <NewConnectionPopup state = {this.state.new_showing} set = {this.setState} client = {this.client} />
                <ServerStatus id = "success-action" 
                    text = {this.state.successful_action_message} 
                    status = "Success" 
                    set = {this.setState} 
                    state = {this.state.successful_action_showing}/>
                <ServerStatus id = "failed-action" 
                    text = {this.state.failed_action_message} 
                    status = "Failure" 
                    set = {this.setState} 
                    state = {this.state.failed_action_showing}/>
                <Loading state = {this.state.loading_file} set = {this.setState}/>

            </div>
        )
    }
}