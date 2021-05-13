import { type } from 'os';
import React, { Component } from 'react';
import '../Css/novalisting.css';
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
                <h3 className = "name-listing">{ "Name:" +this.props.name}</h3>
                <h4> Status: <h3 className = "inner-msg">{this.props.status}</h3></h4>
                <h4>Messages Pending:  <h3 className = "inner-msg">{this.props.messages_pending}</h3></h4>
                <h4>Packets held: <h3 className = "inner-msg">{this.props.packets_pending}</h3> </h4>
            </div>
        )
    }
}
