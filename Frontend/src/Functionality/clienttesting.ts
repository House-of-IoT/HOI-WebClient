import { Client } from "./client";
import assert from "assert";

/* 
This test class tests the protocol/responses 
between the client/server.

This test class assumes that the server you are connecting to
has the same settings as the HOI-GeneralServer

This test class assumes that the HOI-GeneralServer
is hosted locally at 'ws://localhost:50223'.

This test class assumes that the GeneralServer/Client follows the normal
protocol of communication between the client/server , which is :
1.Send password for general server
2.Send name and type(json serialized)
3.check server response
4.begin general sequence
since these tests are network oriented , there are a lot of assumptions in the below tests,
like there will be no connection interrupts, the password matches the server password and etc.
*/

export class Test{
    client:Client;
    name_and_type:string;
    password:string;
    server_name:string;
    connection_string:string
    parent_state:any
  
    constructor(state_set,parent_state){
        this.name_and_type = JSON.stringify({"name":"client_web" , "type":"non-bot"});
        this.password = "";
        this.client = new Client();
        this.server_name = "test";
        this.connection_string = 'ws://192.168.1.109:50223';
        this.client.define_parent_state(state_set);
        this.parent_state = parent_state;
    }

    auth(){
        this.client.set_name_and_type(this.server_name,this.name_and_type);
        let result = this.client.setup_connection("test",this.connection_string,this.password);
        assert.strictEqual(result,true);
    }

    failed_auth(){
        this.client.set_name_and_type(this.server_name,this.name_and_type);
        let result = this.client.setup_connection("test",this.connection_string,this.password+"");
        assert.strictEqual(result,false);
    }

    test_bot_deactivate_and_activate(){
        this.auth();
        setTimeout(()=>{
            this.client.request_bot_action("test","test","deactivate");
            setTimeout(()=>{
                this.client.request_bot_action("test","test","activate")
            },5000)

        },5000)
    }

    test_bot_disconnect(){
        this.auth();
        setTimeout(()=>{
            this.client.request_bot_action("test","test","disconnect");
        },5000)
    }

    tables_are_correct_and_metadata_exist_passed_auth(){
        //this test assumes auth passes
        this.auth();
        setTimeout(() => {
            let connection_exist = this.client.connections.has(this.server_name);
            let connection_string_exist = this.client.connection_strings.has(this.connection_string);
            let auth_status = this.client.auth_status.get(this.server_name);
            let interval_exist = this.client.passive_data_interval_ids.has(this.server_name);
            assert.strictEqual(this.client.current_server_trying_to_auth,this.server_name);
            assert.strictEqual(connection_exist,true);
            assert.strictEqual(connection_string_exist,true);
            assert.strictEqual(auth_status,"success");
            assert.strictEqual(interval_exist,true);
        }, 5000);
    }

    tables_are_correct_and_metadata_exist_failed_auth(){
        //this test assumes auth fails
        this.auth();
        setTimeout(() => {
            let connection_exist = this.client.connections.has(this.server_name);
            let connection_string_exist = this.client.connection_strings.has(this.connection_string);
            let auth_status = this.client.auth_status.get(this.server_name);
            let interval_exist = this.client.passive_data_interval_ids.has(this.server_name);
            assert.strictEqual(this.client.current_server_trying_to_auth,this.server_name);
            assert.strictEqual(connection_exist,false);
            assert.strictEqual(connection_string_exist,false);
            assert.strictEqual(auth_status,"failure");
            assert.strictEqual(interval_exist,false);
        }, 5000);
    }

    connection_remains_alive_after_auth(){
        this.auth();
        setTimeout(()=>{
            let connection = this.client.connections.get(this.server_name);
            assert.strictEqual(connection.readyState, WebSocket.OPEN);
        },5000)
    }
    //assumes that we have constant server state updates
    test_if_only_one_connected_to_server(){
        this.auth();
        this.viewing_server_state_map("servers_devices","client_web","non-bot",this.parent_state.servers_devices);
    }

    // assumes a bot named test is connected and we have constant server state updates
    test_viewing_deactivated_bot(){
        this.auth();
        setTimeout(() => {
            this.client.request_bot_action(this.server_name,"test","deactivate");
            this.viewing_server_state_array("servers_deactivated_bots","test",this.parent_state.servers_deactivated_bots);
        }, 5000);
    }    

    //assumes you are authenticated first before calling this test
    viewing_server_state_map(target:string,expected_value:string,expected_type:string,map:any){
        setTimeout(() => {
            this.client.request_server_state_or_config(this.server_name,target);
            setTimeout(() => {
                let target_value = map.get(this.server_name)
                assert.strictEqual(JSON.parse(target_value)[expected_value],expected_type);
            }, 10000);
        }, 5000);
    }

    //assumes you are authenticated first before calling this test
    viewing_server_state_array(target:string,expected_value:string,map:any){
        setTimeout(() => {
            this.client.request_server_state_or_config(this.server_name,target);
            setTimeout(() => {
                let target_value = map.get(this.server_name)
                assert.strictEqual(target_value.includes(expected_value),true);
            }, 15000);
        }, 5000);
    }

    //assumes you are authenticated first before calling this test
    viewing_server_config(disconnecting:boolean,activating:boolean,deactivating:boolean,viewing:boolean){
        setTimeout(() => {
            this.client.request_server_state_or_config(this.server_name,"server_config");
            setTimeout(() => {
                let target_value = JSON.parse(this.parent_state.servers_configs.get(this.server_name));
                assert.strictEqual(target_value["disconnecting"],disconnecting);
                assert.strictEqual(target_value["activating"],activating);
                assert.strictEqual(target_value["deactivating"],deactivating);
                assert.strictEqual(target_value["viewing"],viewing);
            }, 15000);
        }, 5000);
    }

    viewing_and_editing_server_contacts(){
        this.auth();
        setTimeout(() => {
            this.client.request_server_edit(this.server_name,"add-contact",JSON.stringify({"name":"test","number":"+17769392019"}));
            setTimeout(() => {
                this.client.request_server_state_or_config(this.server_name,"contact_list")
                setTimeout(() => {
                    let target_value = JSON.parse(this.parent_state.servers_contacts.get(this.server_name));
                    assert.strictEqual(target_value["test"],"+17769392019")
                }, 5000);
            }, 10000);
        }, 5000);
    }

    editing_server_config(){
        this.auth();
        setTimeout(() => {
            this.client.request_server_config_change(this.server_name,"change_config_deactivating",true);
            this.viewing_server_config(false,true,true,true)
        }, 5000);
    }


    non_assertive_trigger_rate_limit(){ 
        setInterval(()=>{this.failed_auth()},5000); 
    }
}