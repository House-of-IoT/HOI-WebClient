import React, { Component } from 'react'

export default class SchedulerPopup extends Component<any,any> {
    constructor(props:{}){
        super(props);
        this.state = {
            selected_capabilties:[]
        }
    }

    render() {
        return (
            <div className = "popup-wrapper" id = "scheduler-popup">
                <div id = "scheduler-popup-inner"> 
                    <select name="" id="">
                        {Object.keys(this.props.bots).map((key)=>{
                            return <option onSelect = {}>{key}</option>
                        })}

                    </select>

                    <input placeholder = "Datetime"></input>
                    <div id = "scheduling-capabilities">
                        {}
                    </div>

                    
                </div>                
            </div>
        )
    }


}
