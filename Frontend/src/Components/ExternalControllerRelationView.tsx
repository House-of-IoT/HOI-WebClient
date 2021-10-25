import React, { Component } from 'react'
import ExternalControllerConditionView from './ExternalControllerConditionView';

export default class ExternalControllerRelationView extends Component<any,any>{
    render() {
        let conditions: Array<string> = Object.keys(this.props.relation.conditions);
        
        return (
            <div className = "relation-view-box">
                <h2>{this.props.relation.device_name}</h2>
                <h2>{this.props.relation.action}</h2>
                <div className = "conditions-box">
                    {conditions.map((key:any)=>{
                        return (
                        <ExternalControllerConditionView key_name = {key} key_value = {this.props.relation.conditions[key]}/>);

                    })}
                </div>

            </div>
        )
    }
}
