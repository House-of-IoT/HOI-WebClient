

export class AudioHandler{

    audio = new Audio("/notification.mp3");

    play(){
        this.audio.play();
    }
}