import { BasicResponse } from "./BasicResponse";

export class Client{
    connections : Map<string,WebSocket>
    connection_strings : Map<string,string>
    auth_status : Map<string,string>
    name_and_type : Map<string,string> //json string for value
    current_server_trying_to_auth :string
    server_status : Map<string,Boolean>
    set_parent_state:any
    passive_data_interval_ids:Map<string,NodeJS.Timeout>
    current_bot_for_action : string

    constructor(){
        this.connections = new Map<string,WebSocket>();
        this.connection_strings = new Map<string,string>();
        this.auth_status = new Map<string,string>();
        this.server_status = new Map<string,Boolean>();
        this.name_and_type =  new Map<string,string>();
        this.passive_data_interval_ids = new Map<string,NodeJS.Timeout>();
    }

    setup_connection(server_name:string,connectionString:string,password:string):boolean{
        if (this.connections.has(server_name)){
            return false
        }
        else{
            let connection = new WebSocket(connectionString);
            connection.onopen = ()=>{
                this.authenticate(server_name,password);
            }
            connection.onerror = ()=>{
                this.set_parent_state(
                    {failed_action_showing:true,failed_action_message:
                        "Connection Closed!! If you didn't manually disconnect, please check your network connection."});
                    if(this.connections.has(server_name)){
                        this.connections.delete(server_name);
                        this.connection_strings.delete(server_name);
                        this.set_parent_state({connection_names:Array.from(this.connections.keys())});
                        this.set_parent_state({selected_bots:[]});
                    }
            }
            connection.onmessage = (event)=>{this.handle_auth_response(event)};
            this.connections.set(server_name,connection);
            this.connection_strings.set(server_name,connectionString);
     
            return true;
        }
    }

    authenticate(server_name:string, password:string){
        try{
            if(this.has_credentials(server_name)){
                let connection :WebSocket = this.connections.get(server_name);
                this.auth_status.set(server_name,"unknown");
                this.current_server_trying_to_auth = server_name; 
                connection.send(password);
                connection.send(this.name_and_type.get(server_name));
                connection.send(server_name);
            }
            else{
                throw new Error("Can't locate Credentials");
            }
        }
        catch{
            console.log("exception in authentication");
            this.set_parent_state({failed_action_showing:true,
                failed_action_message:"Issue with authenticating!"});
        }
    }

    request_bot_action(server_name:string,bot_name:string,action:string){
        this.route_bot_action(server_name,action,bot_name);
    }

    request_server_state_or_config(server_name:string,target:string){
        this.execute_message_protocol(server_name,(connection)=>{
            connection.send(target);
        })
    }

    request_server_edit(server_name:string,request:string,value:string){
        this.execute_message_protocol(server_name,(connection)=>{
            connection.send(request)
            connection.send(value)
        })
    }

    request_server_config_change(server_name:string, request:string, new_bool:Boolean){
        let bool_to_string = String(Number(new_bool));
        console.log(bool_to_string);
        console.log("new: "+new_bool)
        this.request_server_edit(server_name,request,bool_to_string);
    }

    route_bot_action(server_name:string, action:string,bot_name:string){
        if(action == "deactivate" || action == "activate" || action == "disconnect"){
            this.execute_message_protocol(server_name,(connection)=>{
                connection.send("bot_control");
                connection.send(action);   
                connection.send(bot_name);
            })
        }
    }

    handle_basic_action_request_response(event:MessageEvent){
        console.log(event.data)
        try{
            let data: BasicResponse= JSON.parse(event.data);
            console.log(data)
            this.update_ui_and_data_after_action_response(data);
        }
        catch{
            alert("got invalid data from server");
        }
    }

    update_ui_and_data_after_action_response(response:BasicResponse){
        console.log(response);
        if(response.status == "needs-admin-auth"){
            this.prompt_and_send_admin_auth_password(response);
        }
        else if(response.action == "activate"){
            this.change_basic_response_component_state(response,
                " has been successfully activated" , " failed to activate");
        }
        else if(response.action == "deactivate"){
            this.change_basic_response_component_state(response,
                " has been successfully deactivated" , " failed to deactivate");
        }
        else if(response.action == "disconnect"){
            this.change_basic_response_component_state(response,
                " has been successfully disconnected" , " failed to disconnect");
        }
        else if (response.action == "viewing"){
            response.bot_name = "";
            this.change_basic_response_component_state(response, 
                " You have successfully gathered server state data!",
                "You have failed gathering server state data!");
            this.populate_viewing_target_if_successful(response);
        }
        else if (response.action == "editing"){
            this.change_basic_response_component_state(response,
                "You have successfully edited the server!",
                 "You have failed to edit the server's state");
        }
    }

    change_basic_response_component_state(response:BasicResponse,success_message:string , failure_message:string){
        console.log(response.status);
        if(response.status == "success"){
            this.set_parent_state(
                {
                    successful_action_message:`${response.server_name}
                    says that ${response.bot_name}`+ success_message})
            this.set_parent_state({successful_action_showing:true});
        }
        else if(response.status == "timeout"){
            this.set_parent_state(
                {
                    failed_action_message:`The request to ${response.server_name}
                     timed-out`})
            this.set_parent_state({failed_action_showing:true});
        }
        else{
            this.set_parent_state(
                {
                    failed_action_message:`${response.server_name}
                    says that ${response.bot_name}`+ failure_message})
            this.set_parent_state({failed_action_showing:true});
        }
        this.check_and_begin_gathering_passive_data(response);
    }
    
    handle_auth_response(event:MessageEvent){
        if(event.data == "success"){
            this.auth_status.set(this.current_server_trying_to_auth,"success");
            this.set_parent_state({connection_names:Array.from(this.connections.keys())});
            this.set_parent_state({successful_action_showing:true,
                successful_action_message:"Successfully Authenticated! Select the server to see the bot(s) data!"});
            this.begin_gathering_bot_data(this.current_server_trying_to_auth);
        }
        else{
            this.set_parent_state({failed_action_showing:true,
                failed_action_message:"Failed Authetication!! Check Your Credentials."});
            this.auth_status.set(this.current_server_trying_to_auth,"failure")
            this.connections.get(this.current_server_trying_to_auth).close();
            this.connections.delete(this.current_server_trying_to_auth);
            this.connection_strings.delete(this.current_server_trying_to_auth);
        }
    }

    /* Begin gathering passive bot data every 5 seconds */
    begin_gathering_bot_data(server_name:string){
        try{
            if(this.connections.has(server_name)){
               let connection = this.connections.get(server_name);
               let intervalId = setInterval(
                   ()=>{
                       connection.send("passive_data")
                   },5000);
                this.passive_data_interval_ids.set(server_name,intervalId);
               connection.onmessage = (event)=>{this.gather_bot_data(event)};
            }
            else{
                throw new Error("Issue");
            }
        }
        catch(e){
            console.log(e);
            this.auth_status.set(server_name,"failure");
            this.connections.delete(this.current_server_trying_to_auth);
            this.connection_strings.delete(this.current_server_trying_to_auth);
            this.set_parent_state({connections:this.connections.keys()});
        }
    }

    /*Grab bot data from event and update parent state with the data */
    gather_bot_data(event:MessageEvent){
        try{
            let bot_string = event.data;
            let bot_object = JSON.parse(bot_string);
            console.log(bot_string)
            let server_name = bot_object["server_name"] ;
            if(server_name == null){
                throw new Error("issue");
            }
            else{
                console.log(bot_string)
                //overwrite the old bot string string.
                this.set_parent_state(prevState => {
                    let previous = Object.assign({}, prevState);
                    previous.server_bot_strings.set(server_name, bot_string);
                    if(server_name == previous.selected_server){
                        previous.selected_bots = bot_object.bots;
                    }                 
                    return previous;
                })
            }
        }
        catch{
            console.log("Issue gathering bot data!");
        }
    }

    prompt_and_send_admin_auth_password(old_response:BasicResponse){
        let connection = this.connections.get(old_response.server_name);
        let password :string= prompt(`${old_response.server_name} is requesting the admin password:`);
        connection.send(password);  
    }

    check_and_begin_gathering_passive_data(response:BasicResponse){
        switch(response.action){
            case "activate":
                this.begin_gathering_bot_data(response.server_name);
                break;
            case "deactivate":
                this.begin_gathering_bot_data(response.server_name);
                break;
            case "disconnect":
                this.begin_gathering_bot_data(response.server_name);
                break;
            case "viewing":
                this.begin_gathering_bot_data(response.server_name);
                break;
            default:
                break;
        }
    }

    /* Update parent state if we gathered requested data*/
    populate_viewing_target_if_successful(response:BasicResponse){
        if(response.status == "success"){
            console.log(response.target_value);
            console.log(response.target);

            this.set_parent_state({loading_content:false});
            if (response.target == "servers_banned_ips"
             || response.target == "servers_devices" 
             || response.target == "servers_deactivated_bots"){
                this.set_parent_state({basic_state_data:response.target_value,basic_state_showing:true});
            }
            else if (response.target == "server_config"){
                this.set_viewing_state(
                    response.server_name,
                    "servers_configs",
                    response.target_value);
                this.set_parent_state({server_settings_showing:true});
            }
            else if(response.target == "contact_list"){
                this.set_parent_state({
                    servers_contacts:response.target_value,server_contacts_showing:true});
            }
            else{
            
            }
        }   
    }
    
    set_viewing_state(server_name:string,data_key:string,target_value:any){
        this.set_parent_state((prev)=>{
            let new_data = Object.assign({}, prev);;
            new_data[data_key].set(server_name, target_value);
            return new_data;
            });
    }

    execute_message_protocol(server_name:string,callback:any){
        try{
            if(this.auth_status.has(server_name) && this.auth_status.get(server_name) == "success"){
                this.clear_server_passive_interval(server_name);
                let connection = this.connections.get(server_name);
                connection.onmessage =  (event)=>{this.handle_basic_action_request_response(event)};
                callback(connection);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    has_credentials(server_name:string):boolean{
        if(this.connections.has(server_name) && this.name_and_type.get(server_name) != null){
            return true;
        }
        else{
            return false;
        }
    }
    set_name_and_type(server_name:string,name_and_type:string){
        this.name_and_type.set(server_name,name_and_type);
    }

    define_parent_state(fun:any){
        this.set_parent_state = fun;
    }

    //clear and delete the server interval timeout that we stored
    clear_server_passive_interval(server_name:string){
        let interval_id = this.passive_data_interval_ids.get(server_name)
        clearInterval(interval_id);
        this.passive_data_interval_ids.delete(server_name);
    }
}