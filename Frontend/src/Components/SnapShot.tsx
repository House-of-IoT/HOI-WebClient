import React, { Component } from 'react'

export default class SnapShot extends Component<{bots:number,types:Set<String>},any> {
    render() {
        return (
            <div id = "snap-shot">
             <h1>SnapShot <img></img></h1>
             <h2>Total bots:{this.props.bots}</h2>
             <h2>Different types: {this.props.types.size}</h2>   
            </div>
        )
    }
}
