import React, { Component } from 'react'

export default class VideoPlayer extends Component<any,any> {
    constructor(props:{}){
        super(props);
        this.state = {
            video : null
        }
    }

    render() {
        return (
            <div className = "popup-wrapper" id = "video_player">
                <video src = {this.state.video}>
                </video>
            </div>
        )
    }
}
