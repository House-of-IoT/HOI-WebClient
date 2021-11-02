import React, { Component } from 'react'

export default class ExternalControllerRelationBuilder extends Component<any,any> {

    constructor(){
        super(null);
        
    }

    render() {
        return (
            <div className = "popup-wrapper"  id = "external-controller-relation-builder">

                <div id = "external-controller-relation-builder-inner">
                    <h1>Relation Builder</h1>
                    <input placeholder = "Action"></input>
                    <input placeholder = "Device Name"></input>
                    
                    
                    <div id = "add-relation-condition-wrapper">
                        <input placeholder = "KEY"></input>
                        <input placeholder = "VALUE"></input>
                        <button>Create Condition</button>
                    </div>

                    <h3>Conditions Added So Far:</h3>
                    <div id = "added-conditions-relation-builder">
                        {}
                    </div>
                
                </div>                
            </div>
        )
    }
}
