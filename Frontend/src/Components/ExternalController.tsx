import React, { Component } from 'react'
import ExternalControllerListing from './ExternalControllerListing';

export default class ExternalController extends Component<any,any> {
    render() {
        return (
            <div id = "ExternalControllerViewWrapper">
                <h2>External Controller</h2>

                <div id = "external-connections-bar">
                    <button>+</button>
                    <h3>Connections</h3>
                </div>
                
                
                <div id = "ExternalControllerConnections">
                    {this.props.controllers.map((name:String)=>{
                        return (
                            <ExternalControllerListing name = {name}/>
                        );
                    })}

                </div>

            </div>
        )
    }
}
