import React, { Component } from 'react';
import logo from '../Img/bot.png';
import '../Css/main.css';
import ListingHub from '../Components/ListingHub';
import Connections from '../Components/ConnectionsList';
import SnapShot from '../Components/SnapShot';
import ConfigHandler from '../Components/ConfigHandler';
import StateViewer from '../Components/StateViewer';
import RemovalConfirmPopup from '../Components/RemovalConfirmPopup';
import NewConnectionPopup from '../Components/NewConnectionPopup';
import { AudioHandler } from '../Functionality/audio';
import { Client } from '../Functionality/client';
import { Test } from '../Functionality/clienttesting';
import ServerStatus from '../Components/ServerStatus';
import ServerSettingsDialog from '../Components/ServerSettingsDialog';
import Loading from '../Components/Loading';
import BasicStateListPopup from '../Components/BasicStateListPopup';
import ContactsPopup from '../Components/ContactsPopup';
import AddContactPopup from '../Components/AddContactPopup';

export default class MainHub extends Component<any,any> {
    audio_handler : AudioHandler;
    state : any;
    client:Client
    test:Test

    constructor(props:{}){
        super(props);
        this.audio_handler = new AudioHandler();
        this.state = {
            connection_names : [],
            removal_showing: false,
            new_showing : false,
            selected_server: "No Server Selected",
            selected_bots : [],
            server_bot_strings : new Map<string,string>(), 
            successful_action_showing:false,
            failed_action_showing:false,
            loading_content:false,
            basic_state_showing:false,
            server_settings_showing:false,
            server_contacts_showing:false,
            add_contacts_showing:false,
            servers_configs : new Map<string,string>(),
            type_of_basic_state : "",
            basic_state_data : "",
            servers_contacts :"",
            //mock values, not really the messages
            failed_action_message:"Server Responded with failure to your authentication request.",
            successful_action_message:"Server Responded with success to your authentication request.",
        }    

        this.setState = this.setState.bind(this);
        this.test = new Test(this.setState,this.state);
        this.client = new Client();
    }

    componentDidMount(){
        this.client.define_parent_state(this.setState);
    }

    componentDidUpdate(){
       // required for testing server state (line below)
       // this.test.parent_state = this.state;
    }

    render() {
        return (
            <div className = "Main-Wrapper">
                <img  src = {logo}></img>
                <h1>House Of IoT</h1>
                <ListingHub selected_server = {this.state.selected_server} client = {this.client} bots = {this.state.selected_bots}/>
                <input id = "bot-search" placeholder = "Search By Name"></input>
                <Connections set = {this.setState} connections = {this.state.connection_names}/>
                <SnapShot 
                    bots = {this.state.selected_bots} 
                    set_parent_state = {this.setState} 
                    parent_state = {this.state} 
                    server = {this.state.selected_server}
                    client = {this.client}/>
                <ConfigHandler client = {this.client} set = {this.setState}/>
                <StateViewer set = {this.setState} client = {this.client} selected_server = {this.state.selected_server}/>
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
                <Loading state = {this.state.loading_file} set = {this.setState} selected_server = {this.state.selected_server}/>
                <ServerSettingsDialog 
                    state = {this.state.server_settings_showing}
                    config = {this.state.servers_configs.get(this.state.selected_server)}
                    client = {this.client}
                    set = {this.setState} 
                    selected_server = {this.state.selected_server}/>
                <BasicStateListPopup
                    state= {this.state.basic_state_showing}
                    data = {this.state.basic_state_data}
                    type = {this.state.type_of_basic_state}
                    set = {this.setState}
                    client = {this.client}
                    selected_server = {this.state.selected_server}/>
                <ContactsPopup
                    state = {this.state.server_contacts_showing}
                    data = {this.state.servers_contacts}
                    selected_server = {this.state.selected_server}
                    set = {this.setState}
                />
                <AddContactPopup
                    state ={this.state.add_contacts_showing}
                    selected_server = {this.state.selected_server}
                    set = {this.setState}
                    client = {this.client}
                />
            </div>
        )
    }
}