import { Client } from "./client";
import assert from "assert";

/* 
This test class tests the protocol/responses 
between the client/server.

This test class assumes that the HOI-GeneralServer
is hosted locally at 'ws://localhost:50223'.

This test class assumes that the GeneralServer/Client follows the normal
protocol of communication between the client/server , which is :

1.Send password for general server
2.Send name and type(json serialized)
3.check server response
4.begin general sequence

*/

export class CommunicationTest{
    client:Client;
    name_and_type:string;
    password:string;
    server_name:string;

    constructor(){
        this.name_and_type = JSON.stringify({"name":"client_web" , "type":"non-bot"});
        this.password = "";
        this.client = new Client(this.name_and_type);
        this.server_name = "test";
    }

    test_auth(){
        this.client.setup_connection(this.server_name,'ws://localhost:50223');
        this.client.set_name_and_type(this.name_and_type);
        this.client.authenticate(this.server_name,this.password);
    }

}