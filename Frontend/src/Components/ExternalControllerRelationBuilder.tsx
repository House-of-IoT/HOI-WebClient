import React, { Component } from 'react'

interface Condition{
    key:String,
    value:String
}

export default class ExternalControllerRelationBuilder extends Component<any,any> {

    constructor(){
        super(null);
        this.state = {
            added_conditions: new Array<Condition>(),
            current_action :"",
            current_device_name:"",
            current_key :"",
            current_value:""
        }
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
                        <button onClick = {()=>{this.setState((prev)=>{
                            let new_condition : Condition = {key:this.state.current_key,value:this.state.current_value}
                            prev.added_conditions.push(new_condition);
                        })}}
                        
                            >Create Condition</button>
                    </div>

                    <h3>Conditions Added So Far:</h3>
                    <div id = "added-conditions-relation-builder">
                        {this.state.added_relations.map((relation)=>{
                            return(

                                <div className = "added-conditions">
                                    <h3>KEY:{relation.key}</h3>
                                    <h3>VALUE:{relation.value}</h3>
                                    <button>Remove</button>
                                </div>
                            );

                        })}
                    </div>
                
                </div>                
            </div>
        )
    }
}
