import React, { Component } from 'react'
import BotList from './BotListing';
import '../Css/Listinghub.css';
//nova'
interface bot{
    messages_pending :Object,
    status: boolean,
    packets_pending :Object,
    name:String
}


export default class ListingHub extends Component<{}, any , bot> {

    constructor(){
        super({});
        this.state = {
            bots :[]
        };
        
    }
    componentDidMount(){
            
    }

    render() {
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
}
