import React, { Component } from 'react'
import BotList from './BotListing';
import '../Css/Listinghub.css';
import look from "../Img/look.svg";
export default class ListingHub extends Component<any, any> {

    constructor(){
        super({});
        this.state = {
        };
        
    }
    componentDidMount(){
            
    }

    render() {
        if(this.props.bots.length > 0){
            return (
                <div id = "List-Hub">
                    
                        {this.props.bots.map((data:any)=>{
                            return (
                                <BotList bot = {data}/>
                            )
                        })} 
                </div>
            )   
                }
        else{
            return (
                <div id = "List-Hub">
                    <img  id = "empty-placeholder"src = {look}/>
                    <h3 id = "empty-placeholder-text">No bots connected!</h3>

                </div>
            )
        }
    }
}
