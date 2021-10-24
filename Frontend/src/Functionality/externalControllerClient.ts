export class ExternalControllerClient{

    connections : Map<string,WebSocket>
    connection_strings : Map<string,string>
    auth_status : Map<string,string>
    current_relations : string
    set_parent_state:any
    current_server_trying_to_auth :string 
    names:Map<string,string>

    constructor(){
        this.connections = new Map<string,WebSocket>();
        this.connection_strings = new Map<string,string>();
        this.auth_status = new Map<string,string>();
        this.names = new Map<string,string>();
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
                    {failed_action_showing:true,failed_action_message:"Connection Closed!! If you didn't manually disconnect, please check your network connection."});
                    if(this.connections.has(server_name)){
                        this.connections.delete(server_name);
                        this.connection_strings.delete(server_name);
                    }
            }
            connection.onmessage = (event)=>{this.handle_auth_response(event)};
            this.connections.set(server_name,connection);
            this.connection_strings.set(server_name,connectionString);
            return true;
        }
    }

    authenticate(server_name:string, password:string){
        let connection :WebSocket = this.connections.get(server_name);
        this.auth_status.set(server_name,"unknown");
        this.current_server_trying_to_auth = server_name; 
        connection.send(password);
        connection.send(this.names.get(server_name))
    }

    handle_auth_response(event:MessageEvent){
        if(event.data == "success"){
            this.set_parent_state({successful_action_showing:true,successful_action_message:"Successfully Authenticated! Select the server to see the relational data!"});
        }
        else{
            this.set_parent_state({failed_action_showing:true,failed_action_message:"Failed Authetication!! Check Your Credentials."});
            this.auth_status.set(this.current_server_trying_to_auth,"failure")
            this.connections.get(this.current_server_trying_to_auth).close();
            this.connections.delete(this.current_server_trying_to_auth);
            this.connection_strings.delete(this.current_server_trying_to_auth);
        }
    }
    
    handle_request_response(event:MessageEvent){
        if(event.data == "success"){
            this.set_parent_state({successful_action_showing:true,successful_action_message:"Action Successful!"});
        }
        else{
            this.set_parent_state({failed_action_showing:true,failed_action_message:"Failed Request! Please try to execute this action again."});
        }
    }

    set_name(server_name:string,name:string){
        this.names.set(server_name,name);
    }

    
}
