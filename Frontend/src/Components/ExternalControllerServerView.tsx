import React, { Component } from 'react'
import ExternalControllerRelationView from './ExternalControllerRelationView';

export default class ExternalControllerServerView extends Component<any,any> {
    render() {
        return (
            <div className = "popup-wrapper" id = "external-controller-server-view">
                <h1>{this.props.server_name}</h1>
                <button>X</button>
                <button>Disconnect</button>
                <h2>Number Of Relations:{this.props.relations.length}</h2>
                <div id = "external-controller-server-view-relation-holder">
                    {this.props.relations.map((relation)=>{
                        return (<ExternalControllerRelationView relation = {relation}/>);
                    })}

                </div>
                
            </div>
        )
    }
}
