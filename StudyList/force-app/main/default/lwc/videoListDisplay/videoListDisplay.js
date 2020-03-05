import { LightningElement,track } from 'lwc';
export default class YouTubePlaylistContainer extends LightningElement {
    
    @track playList=['JTtc8bTjrFo','lfQaXf3VFME','m0O2GvTa3Vk'];
    @track thumbnails=['https://i.ytimg.com/vi/zfZ2Sy_wGPA/default.jpg','https://i.ytimg.com/vi/HvaQw77UQcw/default.jpg','https://yt3.ggpht.com/-IRqYLwPI4vo/AAAAAAAAAAI/AAAAAAAAAAA/sOVEV3oP7hM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg'];
    @track playAll=false;
    @track song;
    @track currentSong;
    @track index=0;
    @track openmodel = false;
    
  
    closeModal() {
        this.openmodel = false
    } 
    openModal(event) {
        var target = event.target;
           this.currentSong=this.playList[target.name];
           this.currentSong;
           this.playAll=false;
           this.openmodel = true;
    }
    handleInput(event){
        this.song=event.target.value;
   
    } 
    handleVideo(){
        this.showVideos=true;
    }
    handlePlayAll(){
        this.index=0;
        this.playAll=true;
        this.openmodel = true;
        this.currentSong= this.playList[this.index];    
    }
    handleNext(){
        if((this.index+1)<this.playList.length){
            this.currentSong= this.playList[this.index+1];
            this.index=this.index+1;
        }
       
    }
    handleBack(){
        if((this.index-1)>=0){
        this.currentSong= this.playList[this.index-1];
        this.index=this.index-1;
        }
    }
   
}
