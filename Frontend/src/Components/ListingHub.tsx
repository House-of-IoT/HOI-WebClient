import React, { Component } from 'react'
import BotList from './BotListing';
import '../Css/bottypes.css';
import '../Css/Listinghub.css';
import look from "../Img/look.svg";
export default class ListingHub extends Component<any, any> {

    componentDidMount(){
            
    }

    render() {
        if(this.props.bots.length > 0){
            return (
                <div id = "List-Hub">
                        {this.props.bots.map((data:any)=>{
                            return (
                                <BotList selected_server = {this.props.selected_server} key = {data.device_name+data.server} bot = {data}/>
                            )
                        })} 
                </div>
            )   
                }
        else{
            return (
                <div id = "List-Hub" style= {{overflowY:"hidden"}}>
                    <img  id = "empty-placeholder"src = {look}/>
                    <h3 id = "empty-placeholder-text">No bots connected!</h3>

                </div>
            )
        }
    }
}
