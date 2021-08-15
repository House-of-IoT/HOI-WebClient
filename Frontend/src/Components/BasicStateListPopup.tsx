import React, { Component } from 'react'
import BasicStateListing from './BasicStateListing'

export default class BasicStateListPopup extends Component<any,any> {

    map_elements(){
        if(this.props.data == ""){
            return(<h1>No Data</h1>);
        }

        let parsed_data = JSON.parse(this.props.data);
        //array of data
        if (this.props.type == "Deactivated" || this.props.type == "BannedIps"){
            parsed_data.map((data:any)=>{
                return(
                    <BasicStateListing data = {data}/>
                );
            })
        }
        else{
            let keys = Object.keys(parsed_data);
            //key value pair of data.
            //formatting name and type as the data for the contact listing
            keys.map((key:any)=>{
                let data_string = `${key}(${parsed_data[key]})`
                return(
                    <BasicStateListing data = {data_string}/>
                );
            })
        }
    }

    render() {
        return (
            <div id = "basic-state-list" className = "popup-wrapper" 
            style = {{display:(this.props.state? "block":"none")}}>
                <h1>{this.props.type}</h1>
                <div id = "basic-state-data">
                    {this.map_elements()}
                </div>

            </div>
        )
    }
}


