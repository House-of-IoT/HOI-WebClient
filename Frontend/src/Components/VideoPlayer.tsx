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
            <div className = "popup-wrapper" id = "video_player"  style = {{display:(this.props.state? "block":"none")}}>
                <h2>Test Title Taken 43 mins ago</h2>
                <button>X</button>
                <video controls autoPlay loop muted  src = {video}>
                </video>
            </div>
        )
    }
}
