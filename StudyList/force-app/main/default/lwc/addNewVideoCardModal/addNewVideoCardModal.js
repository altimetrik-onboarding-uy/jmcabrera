import { LightningElement,track } from 'lwc';

export default class AddNewVideoCardModal extends LightningElement {
    @track videourl;
    @track description;

    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.dispatchEvent(new CustomEvent('closeaddnewvideocard',{ }));
    } 
    saveMethod() {
        const closeme = new CustomEvent('saveaddnewvideocard',
        { 
            detail: {
                videoUrl : this.videourl,
                description : this.description
            }            
        }
        );
        this.dispatchEvent(closeme);
        
        console.log("end save");
    }
    handleVideoUrlChange(event){
        this.videourl = event.target.value;
    }
    handleDescriptionChange(event){
        this.description = event.target.value;
    }
}