import React, { Component } from 'react'
export default class RemovalConfirmPopup extends Component {
    render() {
        return (
            <div className = "popup-wrapper">
                <div id = "removal-popup">
                    <h1>Are you sure you would like to remove this?</h1>
                    <button>Yes</button>
                    <button>No</button>
                </div>
                
            </div>
        )
    }
}
