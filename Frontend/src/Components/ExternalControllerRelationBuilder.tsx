import React, { Component } from 'react'



export default class ExternalControllerRelationBuilder extends Component<any,any> {

    constructor(){
        super(null);
        this.state = {
            added_conditions: new Map<string,string>(),
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
                    <input placeholder = "Action" onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>
                            {this.setState({current_action:event.currentTarget.value})}}>

                    </input>

                    <input placeholder = "Device Name" onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>
                            {this.setState({current_device_name:event.currentTarget.value})}}>

                    </input>
                    
                    
                    <div id = "add-relation-condition-wrapper">
                        <input placeholder = "KEY" onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>
                            {this.setState({current_key:event.currentTarget.value})}}>
                            
                        </input>

                        <input placeholder = "VALUE" onInput = 
                        {
                            (event:React.FormEvent<HTMLInputElement>)=>
                            {this.setState({current_value:event.currentTarget.value})}}>

                        </input>

                        <button onClick = {()=>{this.setState((prev)=>{
                            let previous = Object.assign({}, prev);
                            previous.added_conditions.set(this.state.current_key,this.state.current_value)
                            return previous;
                        })}}
                        
                            >Create Condition</button>
                    </div>

                    <h3>Conditions Added So Far:</h3>
                    
                    <div id = "added-conditions-relation-builder">
                        {Object.keys(this.state.added_relations).map((key)=>{
                            return(

                                <div className = "added-conditions">
                                    <h3>KEY:{key}</h3>
                                    <h3>VALUE:{this.state.added_conditions.get(key)}</h3>
                                    <button 
                                        onClick = {()=>{this.setState((prev)=>{
                                            let previous = Object.assign({}, prev);
                                            previous.added_conditions.delete(key);
                                            return previous;
                                        })}}
                                    >Remove</button>
                                </div>
                            );

                        })}
                    </div>
                    <button>Add Relation</button>
                    <button>Close</button>
                </div>                
            </div>
        )
    }
}
