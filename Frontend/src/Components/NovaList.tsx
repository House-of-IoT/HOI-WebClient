import { type } from 'os';
import React, { Component } from 'react';
import '../Css/novalisting.css';
import alarm from '../Img/alarm.png'; 
import camera from '../Img/camera.png';
import sound from '../Img/sound.png';

type bot = {
    messages_pending :Object,
    status: boolean,
    packets_pending :Object,
    name:String
}

export default class NovaList extends Component<bot,any > {
    constructor(props:bot){
        super(props);
        
    }

    render() {
        return (
            <div className = 'nova-listing'>
                <h3 className = "name-listing">{ this.props.name}</h3>
                
                    <h4> {"Status:" + this.props.status}</h4>
                    <h4>{"Messages Pending:" + this.props.messages_pending}</h4>
                    <h4>{"Packets held:" + this.props.packets_pending}</h4>
                    <button>Stream Mode</button>
                    <button>Alarm Mode</button>
                    <button>Say</button>
                    <button>Disable</button>
            </div>
        )
    }
}
