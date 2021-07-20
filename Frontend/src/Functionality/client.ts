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
            //display popup
        }
    }

    request_bot_action(server_name:string,bot_name:string,action:string){
        try{
            if(this.auth_status.has(server_name) && this.auth_status.get(server_name) =="success"){
                //clear and delete the server interval timeout that we stored
                let interval_id = this.passive_data_interval_ids.get(server_name)
                clearInterval(interval_id);
                this.passive_data_interval_ids.delete(server_name);
                //make the request
                let connection = this.connections.get(server_name);
                this.route_bot_action(connection,action,bot_name);
            }
            else{
                throw new Error("issue with executing action");
            }
        }
        catch(e){
            console.log(e);
        }
    }

    route_bot_action(connection:WebSocket, action:string,bot_name:string){
        if(action == "deactivate" || action == "activate" || action == "disconnect"){
            connection.onmessage = (event)=>{this.handle_basic_action_request_response(event)};
            connection.send("bot_control");
            connection.send(action);   
            connection.send(bot_name);
        }
    }

    handle_basic_action_request_response(event:MessageEvent){
        console.log(event.data)
        try{
            let data: BasicResponse= JSON.parse(event.data);
            console.log(data)
            this.update_ui_after_action_response(data);
        }
        catch{
            alert("got invalid data from server");
        }
    }


    update_ui_after_action_response(response:BasicResponse){
        if(response.action == "activate"){
            this.change_response_component_state(response,
                " has been successfully activated" , " failed to activate");
        }

        else if(response.action == "deactivate"){
            this.change_response_component_state(response,
                " has been successfully deactivated" , " failed to deactivate");
        }

        else if(response.action == "disconnect"){
            this.change_response_component_state(response,
                " has been successfully disconnected" , " failed to disconnect");
        }
    }

    change_response_component_state(response:BasicResponse,success_message:string , failure_message:string){
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
        //checks to see if we should gather passive data again and executes
        this.check_and_begin_gathering_passive_data(response);
    }
    
    handle_auth_response(event:MessageEvent){
        if(event.data == "success"){
            console.log("passed auth");
            this.auth_status.set(this.current_server_trying_to_auth,"success");
            this.begin_gathering_bot_data(this.current_server_trying_to_auth);
           
        }
        else{
            console.log("failed auth");
            this.auth_status.set(this.current_server_trying_to_auth,"failure")
            this.connections.get(this.current_server_trying_to_auth).close();
            this.connections.delete(this.current_server_trying_to_auth);
            this.connection_strings.delete(this.current_server_trying_to_auth);
        }
    }

    begin_gathering_bot_data(server_name:string){
        try{
            if(this.connections.has(server_name)){
               let connection = this.connections.get(server_name);
               let intervalId = setInterval(
                   ()=>{
                       connection.send("passive_data")
                   },3000);
                this.passive_data_interval_ids.set(server_name,intervalId);
               connection.onmessage = (event)=>{this.gather_bot_data(event)};
            }
            else{
                throw new Error("Issue");
            }
        }
        catch{
            this.auth_status.set(server_name,"failure");
            this.connections.delete(this.current_server_trying_to_auth);
            this.connection_strings.delete(this.current_server_trying_to_auth);
        }
    }

    gather_bot_data(event:MessageEvent){
        try{
            let bot_string = event.data;
            let bot_object = JSON.parse(bot_string);
            let server_name = bot_object["server_name"] ;
            if(server_name == null){
                throw new Error("issue");
            }
            else{
                console.log(bot_string)
                //overwrite the old bot string string.
                //this.set_parent_state(prevState => {
                  //  let previous = Object.assign({}, prevState);
                   // previous[server_name] = bot_string;                 
                   // return previous;
                 // })
            }
        }
        catch{
            //alert the 
            console.log("no bot data found");
        }
    }

    gather_list_of_deactivated_bots(server_name:string){
        
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
            default:
                break;

        }

    }

    has_credentials(server_name:string):boolean{
        if(this.connections.has(server_name) && this.name_and_type != null){
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
}