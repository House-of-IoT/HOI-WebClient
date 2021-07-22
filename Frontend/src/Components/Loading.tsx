import React, { Component } from 'react'
import logo from '../Img/bot.png';
export default class Loading extends Component<any,any> {
    render() {
        return (
            <div  className ="popup-wrapper" id = "loading"  style = {{display:(this.props.state? "block":"none")}}>
                <div id = "loading-wrapper">
                    <h1>Loading Content</h1>
                    <img src ={logo} ></img>    
                </div>               
            </div>
        )
    }
}
