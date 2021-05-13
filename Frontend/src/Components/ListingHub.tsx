import React, { Component } from 'react'

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
            bots :[]
        };
        
    }
    componentDidMount(){

    }

    render() {
        return (
            <div id = "Nova-List-Hub">
                <p>
                    {this.state.bots.map((song:bot)=>{
                        
                    })}

                </p>

                
            </div>
        )
    }
}
