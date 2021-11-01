import React, { Component } from 'react'
import ExternalControllerConditionView from './ExternalControllerConditionView';

export default class ExternalControllerRelationView extends Component<any,any>{
    render() {
        let conditions: Array<any> = this.props.relation.conditions;
        
        return (
            <div className = "relation-view-box">
                <h2>Device name:{this.props.relation.device_name}</h2>
                <h2>Action:{this.props.relation.action}</h2>
                <h3 id = "relation-view-condition-tag">Conditions:</h3>
                <div className = "conditions-box">
                    
                    {conditions.map((condition:any)=>{
                        let key = Object.keys(condition)[0];
                        return (
                        <ExternalControllerConditionView key_name = {key} key_value = {condition[key]}/>);

                    })}
                </div>

            </div>
        )
    }
}
