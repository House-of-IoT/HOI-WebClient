import { type } from 'os';
import React, { Component } from 'react';

type bot = {
    messages_pending :[],
    status: boolean,
    packets_pending :[],
    name:String
}

export default class NovaList extends Component<bot,any > {
    constructor(props:bot){
        super(props);
        
    }

    render() {
        return (
            <div className = 'nova-listing'>
                <h3>{ "Name:" +this.props.name}</h3>
                <h4>{ "Status:" +this.props.status}</h4>
                <h4>{"Messages Pending:" + this.props.messages_pending}</h4>
                <h4>{"Packets held :" + this.props.packets_pending}</h4>
            </div>
        )
    }
}
