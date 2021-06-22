import React, { Component } from 'react'
import BotList from './BotListing';
import '../Css/Listinghub.css';
import look from "../Img/look.svg";
export default class ListingHub extends Component<{}, any> {

    constructor(){
        super({});
        this.state = {
            bots :[]
        };
        
    }
    componentDidMount(){
            
    }

    render() {
        if(this.state.bots.length > 0){
            return (
                <div id = "List-Hub">
                    
                        {this.state.bots.map((data:any)=>{
                            return (
                                <BotList{...data}/>
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
