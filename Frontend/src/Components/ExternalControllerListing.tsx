import React, { Component } from 'react'

export default class ExternalControllerListing extends Component<any,any> {
    render() {
        return (
            <div className = "external-controller-server-listing">
                <h1>{this.props.name}</h1>
                <button onClick = {()=>{

                this.props.set(prevState => {
                    let previous = Object.assign({}, prevState);
                    previous.selected_external_controller = this.props.name;
                    previous.external_controller_server_view_showing = true;
                    previous.external_controller_relations.set("test1",JSON.stringify([{device_name : "tester",action:"test2",conditions:[{test21:"2"},{test212:"2333"}]}]));
                    return previous;
                    });
                               
                }} >Open</button>
            </div>
        )
    }
}
