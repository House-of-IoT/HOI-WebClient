import { timingSafeEqual } from "crypto";
import CryptoJS from "crypto-js";

export class Client{
 
    connections : Map<string,WebSocket>
    connection_strings : Map<string,string>
    auth_status : Map<string,string>
    name_and_type : string //json string
    current_server_trying_to_auth :string

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
            
        }
        else{
            this.auth_status.set(this.current_server_trying_to_auth,"failure")
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


}