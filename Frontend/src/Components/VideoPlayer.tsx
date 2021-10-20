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
                <h2>{this.props.title}</h2>
                <video src = {this.props.video}>
                </video>
            </div>
        )
    }
}
