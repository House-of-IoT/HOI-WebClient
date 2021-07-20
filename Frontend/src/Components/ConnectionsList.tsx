import React, { Component } from 'react'
import ConnectionListing from './ConnectionListing'

export default class Connections extends Component<any,any> {
    render() {
        return (
            <div id = "connections">
                <h2 id = "connection-header">
                    Connections<button id = "add-connections" onClick = {()=>{this.props.set({new_showing:true})}}>+
                    </button> </h2>
                {this.props.connections.map(connection => {
                    return <ConnectionListing connection= {connection} set = {this.props.set} />
                })}
                
            </div>
        )
    }
}
