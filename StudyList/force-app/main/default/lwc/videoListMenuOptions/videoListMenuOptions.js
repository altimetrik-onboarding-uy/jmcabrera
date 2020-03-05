import { LightningElement, track } from 'lwc';

export default class VideoListMenuOptions extends LightningElement {
    
    hoveringMouseClass="slds-box slds-theme_shade";

    @track showVideoListMenuOptions = false;
    closeMe(){
        this.dispatchEvent("closevideomenuoptions",{});
    }
    handleCloseVideoMenuOptions(event)
    {
        this.showVideoListMenuOptions = false; 
    }
    handleOpenVideoMenuOptions()
    {
        this.showVideoListMenuOptions = !this.showVideoListMenuOptions;
    }
    handleOpenCreateStudyList()
    {
        this.showVideoListMenuOptions = false;
        this.dispatchEvent(new CustomEvent("opencreatestudylist",{}));
    }
    handleOnMouseOver(event)
    {
        
    }
    handleOnMouseOut(event)
    {
        
    }
}