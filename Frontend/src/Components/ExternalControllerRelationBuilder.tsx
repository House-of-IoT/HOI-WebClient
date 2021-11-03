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
        console.log( "data" + Array.from(this.state.added_conditions.keys()));
        return (
            <div className = "popup-wrapper"  id = "external-controller-relation-builder">

                <div id = "external-controller-relation-builder-inner">
                    <h1 id = "relation-builder-title">Relation Builder</h1>
                    <div id = "external-controller-relation-builder-outer-names">
                        <h3>1.</h3>
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
                    
                    </div>

                    
                    <div id = "add-relation-condition-wrapper">
                    <h3>2.</h3>
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
                            console.log(this.state)
                            let previous = Object.assign({}, prev);
                            previous.added_conditions.set(this.state.current_key,this.state.current_value)
                            return previous;
                        })}}
                        
                            >Create Condition</button>
                    </div>

                    <h3>Conditions Added So Far:</h3>
                    
                    <div id = "added-conditions-relation-builder">
                        {Array.from(this.state.added_conditions.keys()).map((key)=>{
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

                    <div id = "external-controller-builder-bottom-buttons">
                        <button id = "external-controller-add-relation-button">Add Relation</button>
                        <button id = "external-controller-add-close-builder">Close</button>
                    </div>
                    
                </div>                
            </div>
        )
    }
}
