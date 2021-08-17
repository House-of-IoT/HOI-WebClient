import React, { Component } from 'react'
import BasicStateListing from './BasicStateListing'

export default class BasicStateListPopup extends Component<any,any> {

    map_elements(){
        if(this.props.data == ""){
            return "";
        }
        //array of data
        if (this.props.type == "Deactivated" || this.props.type == "BannedIps"){
            console.log(this.props.data);
            return this.props.data;
        }
        else{
            let parsed_data = JSON.parse(this.props.data);
            let keys = Object.keys(parsed_data);

            //key value pair of data.
            //formatting name and type as the data for the contact listing
            let data_strings = [];
            keys.map((key:any)=>{
                let data_string = `${key}(${parsed_data[key]})`;
                data_strings.push(data_string);
            })
            return data_strings;
        }
    }

    render() {

        let data :any= this.map_elements()

        if(data == "" || data.length == 0){
            return(<div id = "basic-state-list-wrapper" className = "popup-wrapper" 
            style = {{display:(this.props.state? "block":"none")}}>
                <div id = "basic-state-list" > 
                    <h1>{this.props.type}</h1>
                    <button  id = "close-basic-state" onClick = {()=>{this.props.set({basic_state_showing:false})}}>X</button>
                    <div id = "basic-state-data">
                        <h1>No Data!</h1>
                    </div>
                </div>
            </div>);
        }
        else{
            return (
                <div id = "basic-state-list-wrapper" className = "popup-wrapper" 
                style = {{display:(this.props.state? "block":"none")}}>
                    <div id = "basic-state-list" > 
                        <h1>{this.props.type}</h1>
                        <button  id = "close-basic-state" onClick = {()=>{this.props.set({basic_state_showing:false})}}>X</button>
                        <div id = "basic-state-data">
                            {   data.map((data_string:any)=>{
                                return(  <BasicStateListing 
                                            type = {this.props.type} 
                                            client = {this.props.client} 
                                            set = {this.props.set} 
                                            data = {data_string}
                                            selected_server = {this.props.selected_server}/>);
                            })
                              }
                        </div>
                    </div>
                </div>
            )
        }
    }
}


