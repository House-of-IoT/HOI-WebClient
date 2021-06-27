import { timingSafeEqual } from "crypto";
import CryptoJS from "crypto-js";

export class Client{
 
    connections : Map<string,WebSocket>
    connection_strings : Map<string,string>
    auth_status : Map<string,string>
    name_and_type : string //json string
    current_server_trying_to_auth :string
    server_status : Map<string,Boolean>
    set_bot_state:any

    constructor(name_and_type:string){
        this.name_and_type = name_and_type;

    }

    setup_connection(server_name:string,connectionString:string):boolean{
        if (this.connections.has(server_name)){
            return false
        }
        else{
            this.connections.set(server_name,new WebSocket(connectionString));
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
                connection.onmessage = this.handle_auth_response;
                connection.send(password);
                connection.send(this.name_and_type);
            }
            else{
                throw new Error("Can't locate Credentials");
            }
        }
        catch{
            //display popup
        }
    }

    handle_auth_response(event:MessageEvent){
        if(event.data == "success"){
            this.auth_status.set(this.current_server_trying_to_auth,"success");
            this.begin_gathering_bot_data(this.current_server_trying_to_auth);
        }
        else{
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
               connection.onmessage = this.gather_bot_data;
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
                //overwrite the old bot string string.
                this.set_bot_state(prevState => {
                    let previous = Object.assign({}, prevState);
                    previous[server_name] = bot_string;                 
                    return previous;
                  })
            }
        }
        catch{
            //alert the 
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

    set_name_and_type(name_and_type:string){
        this.name_and_type = name_and_type
    }

    define_bot_state(fun:any){
        this.set_bot_state = fun;
    }
}