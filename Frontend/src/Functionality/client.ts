import { timingSafeEqual } from "crypto";
import CryptoJS from "crypto-js";

export class Client{
 
    connections : Map<string,WebSocket>
    connection_keys : Map <string,any>
    private_connection_keys : Map<string,any>
    server_passwords : Map<string,string>
    auth_status : Map<string,string>
    name_and_type : string //json string

    constructor(name_and_type:string){
        this.name_and_type = name_and_type;

    }

}