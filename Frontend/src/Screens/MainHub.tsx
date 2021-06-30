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
            connections : [
                { name : "Ralph Server"},
                { name : "General"}
            ],
            types : new Set(),
            bots : 0,
            removal_showing: false,
            new_showing : false,
            selected_bots : [],//when a server is selected these will be the main bots
            server_bot_strings : new Map(), // all passive bot data from one server stored in one string.
            successful_action_showing:false,
            failed_action_showing:false,
            failed_action_message:"",
            successful_action_message:"",
        }    
        this.setState = this.setState.bind(this);
        this.test = new Test();
    }
    
    componentDidMount(){
        this.audio_handler.play();
        this.test.auth();

    }
    render() {
        return (
            <div className = "Main-Wrapper">
                <img  src = {logo}></img>
                <h1>House Of IoT</h1>
                <ListingHub bots = {[
                    {type:"reed_switch",state:true , active_status:true, device_name:"backdoor" , server:"test"},
                    {type:"home_monitor" , device_name : "home_monitor" , server:"test"},
                    {type:"ralph" , active_status:true,device_name :"ralph_home_2" , server:"test"},
                    {type:"ralph" , active_status:false,device_name :"ralph_home_3" , server:"test"},
                    {type:"gas_fire_smoke" , active_status:true,device_name :"heating_room" , server:"test"}]}/>
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