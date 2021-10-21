import React, { Component } from 'react';
import video from "../Img/test.mp4";

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
                <video controls autoPlay loop muted  src = {video}>
                </video>
            </div>
        )
    }
}
