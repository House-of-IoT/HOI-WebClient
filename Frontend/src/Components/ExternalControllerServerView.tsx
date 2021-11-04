import React, { Component } from 'react'
import ExternalControllerRelationView from './ExternalControllerRelationView';

export default class ExternalControllerServerView extends Component<any,any> {
    render() {
        let relations;

        if(this.props.relations.has(this.props.server_name)){
            relations = JSON.parse(this.props.relations.get(this.props.server_name));
        }
        else{
            relations = [];
        }

        return (
            <div className = "popup-wrapper" id = "external-controller-server-view"  
               style = { {display:(this.props.state? "block":"none")}}>
               
                <div id = "inner-external-controller-server-view">
                    <h1 id = "server-view-name">{this.props.server_name}</h1>
                    <button id  = "disconnect-button-external-controller">Disconnect</button>
                    <h2 id = "relation-server-view-number">
                        
                        Number Of Relations:{relations.length}</h2>
                    <div id = "external-controller-server-view-relation-holder">
                        {relations.map((relation)=>{
                            return (<ExternalControllerRelationView relation = {relation}/>);
                        })}

                    </div>
                    <button id = "add-button-external-controller"
                         onClick = {()=>{this.props.set({relation_builder_showing:true,
                            external_controller_server_view_showing:false})}}
                    >Add Relation</button>
                    <button id = "edit-button-external-contorller-server-view" >Edit Relation</button>
                    <button id  = "close-external-controller-server-view"
                        onClick = {()=>{this.props.set({external_controller_server_view_showing:false})}}
                        >Close Dialog</button>
                </div>
            </div>
        )
    }
}
