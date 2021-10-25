import React, { Component } from 'react'

export default class ExternalControllerRelationView extends Component<any,any>{
    render() {
        let conditions = Object.keys(this.props.relation.conditions)

        return (
            <div className = "relation-view-box">
                <h2>{this.props.relation.device_name}</h2>
                <h2>{this.props.relation.action}</h2>
                <div>

                </div>

            </div>
        )
    }
}
