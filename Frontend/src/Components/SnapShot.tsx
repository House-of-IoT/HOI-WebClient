import React, { Component } from 'react'
import greenicon  from "../Img/greenicon.png";
export default class SnapShot extends Component<any,any> {
    render() {
        let types = new Set();
        for ( var data of this.props.bots){
            if(!types.has(data.type)){
                types.add(data.type);
            }
        }
        return (
            <div id = "snap-shot">
             <h1>SnapShot <img id = "icon-snapshot" src = {greenicon}></img></h1>
             <h2>Total bots:{this.props.bots.length}</h2>
             <h2>Different types: {types.size}</h2>   
            </div>
        )
    }
}
