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
import SchedulerAccessBar from '../Components/SchedulerAccessBar';
import SchedulerPopup from '../Components/SchedulerPopup';
import VideoPlayer from '../Components/VideoPlayer';
import ExternalController from '../Components/ExternalController';
import { ExternalControllerClient } from '../Functionality/externalControllerClient';
import ExternalControllerServerView from '../Components/ExternalControllerServerView';
import ExternalControllerRelationBuilder from '../Components/ExternalControllerRelationBuilder';

/*Main page.
This class holds all of the main components for control.
This class holds all of the main state data.
*/

export default class MainHub extends Component<any,any> {
    audio_handler : AudioHandler;
    state : any;
    client:Client
    test:Test
    external_controller_client:ExternalControllerClient

    constructor(){
        super(null);
        this.audio_handler = new AudioHandler();
        this.state = {
            //external controller servers/components state
            external_controller_connection_names : ["test1","test2","test3","LongerNameExample"],
            external_controller_relations : new Map<string,string>(),
            external_controller_server_view_showing:false,
            selected_external_controller: "No Server Selected",
            relation_builder_showing:false,

            //HOI-GeneralServer servers/components state
            selected_server: "No Server Selected",
            server_bot_strings : new Map<string,string>(), 
            server_settings_showing:false,
            servers_configs : new Map<string,string>(),
            server_contacts_showing:false,
            add_contacts_showing:false,
            servers_contacts :new String(),
            connection_names : [],
            selected_bots : [],

            //HOI-GeneralServer AutoScheduling components state
            scheduler_popup_showing:false,

            //Request response popups state
            successful_action_showing:false,
            failed_action_showing:false,
            failed_action_message:"Server Responded with failure to your authentication request.",
            successful_action_message:"Server Responded with success to your authentication request.",

            //state viewing component control state
            type_of_basic_state : new String(),
            basic_state_data : new String(),
            basic_state_showing:false,
    
            //general component state
            video_player_showing:false,
            loading_content:false,
            removal_showing: false,
            new_showing : false,

            //data gather pausing state
            paused_data_gathering:false,
            data_gathering_paused_time: new Date(),

            //timestamp state
            last_updated_passive_data_date: new Date(),
        }    

        this.setState = this.setState.bind(this);
        this.test = new Test(this.setState,this.state);
        this.client = new Client();
        this.external_controller_client = new ExternalControllerClient();
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
                <div id = "right-bar">
                    <SnapShot 
                        bots = {this.state.selected_bots} 
                        set_parent_state = {this.setState} 
                        parent_state = {this.state} 
                        server = {this.state.selected_server}
                        client = {this.client}
                        last_date = {this.state.last_updated_passive_data_date}/>
                    <ConfigHandler client = {this.client} set = {this.setState}/>
                    <StateViewer set = {this.setState} client = {this.client} selected_server = {this.state.selected_server}/>
                    <RemovalConfirmPopup state = {this.state.removal_showing} set = {this.setState}/>
                    <SchedulerAccessBar set = {this.setState}/>
                    <ExternalController set = {this.setState} controllers = {this.state.external_controller_connection_names}/>
                </div>
               
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
                    client = {this.client}
                />
                <AddContactPopup
                    state ={this.state.add_contacts_showing}
                    selected_server = {this.state.selected_server}
                    set = {this.setState}
                    client = {this.client}
                />
                <SchedulerPopup bots = {this.state.selected_bots} state = {this.state.scheduler_popup_showing}/>
                <VideoPlayer state = {this.state.video_player_showing}/>
                <ExternalControllerServerView set = {this.setState} state = {this.state.external_controller_server_view_showing} server_name = {this.state.selected_external_controller} relations = {this.state.external_controller_relations}/>
                <ExternalControllerRelationBuilder state = {this.state.relation_builder_showing} set = {this.setState}/>
            </div>
        )
    }
}