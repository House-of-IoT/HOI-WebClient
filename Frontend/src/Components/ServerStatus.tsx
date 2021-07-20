import React, { Component } from 'react'

export default class ServerStatus extends Component<any,any> {
    render() {

        return (
            <div className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                <div className = "server_status"  id = {this.props.id}>
                    <h1>{this.props.status}</h1>
                    <p>{this.props.text}</p>
                    <button onClick = {()=>{
                        if(this.props.status == "Success"){
                            this.props.set({successful_action_showing:false});
                        }
                        else{
                            this.props.set({failed_action_showing:false});
                        }

                    }}>OK</button>
                </div>
            </div>
        )
    }
}
