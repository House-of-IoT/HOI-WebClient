export class ExternalControllerClient{

    connections : Map<string,WebSocket>
    connection_strings : Map<string,string>
    auth_status : Map<string,string>
    relations : Map<string,string>
    set_parent_state:any
    
    constructor(){
        this.connections = new Map<string,WebSocket>();
        this.connection_strings = new Map<string,string>();
        this.auth_status = new Map<string,string>();
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
                        this.set_parent_state();
                    }
            }
            connection.onmessage = (event)=>{this.handle_auth_response(event)};
            this.connections.set(server_name,connection);
            this.connection_strings.set(server_name,connectionString);
     
            return true;
        }
    }

    authenticate(server_name:string, password:string){

    }

    handle_auth_response(event:MessageEvent){

    }
}
