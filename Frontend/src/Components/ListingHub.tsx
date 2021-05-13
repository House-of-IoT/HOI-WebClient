import React, { Component } from 'react'
import NovaList from './NovaList';

//nova'
interface bot{
    messages_pending :[],
    status: boolean,
    packets_pending :[],
    name:String
}


export default class ListingHub extends Component<{}, any , bot> {

    constructor(){
        super({});
        this.state = {
            bots :[{message_pending : [1,2,3] , status : true  , packets_pending :[1] , name : "ok"}]
        };
        
    }
    componentDidMount(){
            
    }

    render() {
        return (
            <div id = "Nova-List-Hub">
                <p>
                    {this.state.bots.map((data:bot)=>{
                        return (
                            <NovaList   { ...data}/>
                        )
                    })}

                </p>

                
            </div>
        )
    }
}
