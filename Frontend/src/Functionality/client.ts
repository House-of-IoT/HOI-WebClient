import { timingSafeEqual } from "crypto";
import CryptoJS from "crypto-js";

export class Client{
 
    connections : Map<string,WebSocket>
    server_passwords : Map<string,string>
    auth_status : Map<string,string>
    name_and_type : string //json string

    constructor(name_and_type:string){
        this.name_and_type = name_and_type;

    }

    setup_connection(server_name:string):boolean{
        if (this.connections.has(server_name)){
            return false
        }
        else{
            
        }
    }

}