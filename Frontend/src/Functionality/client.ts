import CryptoJS from "crypto-js";

export class Client{
 
    connections : Map<string,WebSocket>
    connection_keys : Map <string,any>

    setup_connection(connectionString:string , name:string , key:string): boolean{
        try{
            this.connections.set(name,new WebSocket(connectionString))
            let crypto_key = CryptoJS.enc.Utf8.parse('okwerw'); 
            this.connection_keys.set(name,crypto_key)
            return true;
        }
        catch{
            return false;
        }
    }

    send_server_message(server_name:string, message:string){

    }

    encrypt(plaintext:string , key:string){
        var encrypted_b64 = CryptoJS.AES.encrypt(plaintext, key);
        return encrypted_b64;
    }

    decrypt(text:string,key:string):string{
        let bytes = CryptoJS.AES.decrypt(text, key);
        let output_plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return output_plaintext;
    }


}