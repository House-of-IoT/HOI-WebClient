import React, { Component } from 'react'
import ExternalControllerRelationView from './ExternalControllerRelationView';

export default class ExternalControllerServerView extends Component<any,any> {
    render() {
        return (
            <div className = "popup-wrapper" id = "external-controller-server-view"  style = {{display:(this.props.state? "block":"none")}}>
               
                <div id = "inner-external-controller-server-view">
                    <h1 id = "server-view-name">{this.props.server_name}</h1>
                    <button id  = "disconnect-button-external-controller">Disconnect</button>
                    <h2 id = "relation-server-view-number">Number Of Relations:{this.props.relations.length}</h2>
                    <div id = "external-controller-server-view-relation-holder">
                        {this.props.relations.map((relation)=>{
                            return (<ExternalControllerRelationView relation = {relation}/>);
                        })}

                    </div>
                    <button id = "add-button-external-controller">Add Relation</button>
                    <button id  = "close-external-controller-server-view">Close Dialog</button>
                </div>
            </div>
        )
    }
}
