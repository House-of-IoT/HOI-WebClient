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
    setup_connection(connectionString:string , name:string , key:string): boolean{
        try{
            this.connections.set(name,new WebSocket(connectionString))
            let crypto_key = CryptoJS.enc.Utf8.parse(key); 
            this.connection_keys.set(name,crypto_key)
            this.auth_status.set(name,"unknown");
            return true;
        }
        catch{
            return false;
        }
    }

    send_server_message(server_name:string, message:string): boolean{
        if(this.has_initial_and_private_requirements(server_name)){
            try{
                let public_key: string = this.connection_keys.get(server_name);
                let private_key: string = this.private_connection_keys.get(server_name);
                let connection: WebSocket = this.connections.get(server_name);
                let level_one_encrypted_data = this.encrypt(message,public_key);
                let level_two_encrypted_data = this.encrypt(level_one_encrypted_data,private_key);
                connection.send(level_two_encrypted_data);
                return true;
            }
            catch{
                return false;
            }
        }
    }

    gather_private_key(server_name:string){
        if(this.has_initial_requirements(server_name)){
            let public_key = this.connection_keys.get(server_name);
            let connection: WebSocket= this.connections.get(server_name);
            connection.onmessage = (message)=>{this.gather_private_callback(message,public_key,server_name)}
        }
    }

    gather_private_callback(message:MessageEvent<any>,public_key:string,server_name:string){
            let decrypted_private_key = this.decrypt(message.data,public_key);
            this.private_connection_keys.set(server_name,decrypted_private_key);
    }

    authenticate(server_name:string){
        if(this.has_initial_and_private_requirements(server_name)){
            if(this.server_passwords.has(server_name)){
                let password = this.server_passwords.get(server_name);
                let connection:WebSocket = this.connections.get(server_name);
                connection.onmessage = (message)=>{this.check_auth_response_and_update_status(server_name ,message.data)}
                this.send_server_message(server_name,password);
                this.send_server_message(server_name,this.name_and_type);
            }
        }    
    }

    // connection and public key
    has_initial_requirements(server_name:string){
        if(this.connections.has(server_name) && this.connection_keys.has(server_name)){
            return true;
        }
        else{
            return false
        }
    }

    has_initial_and_private_requirements(server_name:string){
        if(this.has_initial_requirements(server_name) && this.private_connection_keys.has(server_name)){
            return true;
        }
        else{
            return false;
        }
    }

    check_auth_response_and_update_status(server_name:string,message:string){
        let response = this.double_decrypt(server_name, message);
        if(response == "success"){
            this.auth_status.set(server_name,"good");
        }
        else{
            this.auth_status.set(server_name,"bad");
        }
    }

    begin_gathering_periodic_data(data:string){
        let periodic_data = JSON.parse(data);
        console.log(Object.keys(periodic_data));
    }
    double_decrypt(server_name:string , message:string):string{
        if(this.has_initial_and_private_requirements(server_name)){
            let public_key = this.connection_keys.get(server_name);
            let private_key = this.private_connection_keys.get(server_name);
            let single_decrypt = this.decrypt(message,public_key);
            let double_decrypt = this.decrypt(single_decrypt,private_key);
            return double_decrypt;
        }
    }

    encrypt(plaintext:string , key:string):string{
        var encrypted_b64 = CryptoJS.AES.encrypt(plaintext, key);
        return encrypted_b64;
    }

    decrypt(text:string,key:string):string{
        let bytes = CryptoJS.AES.decrypt(text, key);
        let output_plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return output_plaintext;
    }

}