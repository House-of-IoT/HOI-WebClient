import React, { Component } from 'react'
import NovaList from './NovaList';
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
            bots :[{messages_pending : 2 , status : true  , packets_pending :3 , name : "osdfsfsfsdfk"},
                   {messages_pending : 2 , status : true  , packets_pending :3 , name : "ok"},
                   {messages_pending : 2 , status : true  , packets_pending :3 , name : "ok"}]
        };
        
    }
    componentDidMount(){
            
    }

    render() {
        return (
            <div id = "List-Hub">
                
                    {this.state.bots.map((data:bot)=>{
                        return (
                            <NovaList   { ...data}/>
                        )
                    })}
                
                

                

                
            </div>
        )
    }
}
