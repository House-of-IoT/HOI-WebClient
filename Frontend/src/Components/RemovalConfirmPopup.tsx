import React, { Component } from 'react'
export default class RemovalConfirmPopup extends Component<any,any> {
    render() {
        return (
            <div className = "popup-wrapper" style = {{display:(this.props.state? "block":"none")}}>
                <div id = "removal-popup" >
                    <h1>Are you sure you would like to remove this?</h1>
                    <button>Yes</button>
                    <button onClick = {()=>{this.props.set({removal_showing:false})}}>No</button>
                </div>
                
            </div>
        )
    }
}
