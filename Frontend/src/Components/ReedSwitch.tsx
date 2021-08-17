import React, { Component } from 'react'

export default class ReedSwitch extends Component<any,any> {
    render() {
        return (
            <div className = "reed-switch">
                <h1 > 
                {this.props.state? "Open!!" : "Closed"}</h1>
                <h3>{this.props.device_name}(Reed Switch)</h3>
                <h3>Server:Home</h3>
                <button  onClick={()=>{
                    


                }} style = {{backgroundColor:"red"}}>
                    {"Deactivate" }</button>
            </div>
        )
    }
}
//#242c37