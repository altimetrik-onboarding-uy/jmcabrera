import { LightningElement,api,track } from 'lwc';

export default class VideoListCardTile extends LightningElement {

    @api videoUrl = "";
    _description = "";
    
    StudyList__c;

    @api indexId;
    @api thumbnailSrc;
    @api videoTitle;
    @track ArticleUrl__c = "";
    @track Description__c = "";
   
    @track editingCard;
    

    get inputsDisabled(){
        return !this.editingCard;
    }
    handleUrlChange(event)
    {
        this.videoUrl = event.target.value;
    }
    handleDescriptionChange(event)
    {
        this._description = event.target.value;
    }
    handleEditAction(event){
        this.editingCard = true;
    }
    handleSaveAction(event){
        this.ArticleUrl__c = this.videoUrl === undefined ? "" : this.videoUrl;
        this.Description__c = this._description === undefined ? "" : this._description;
        this.editingCard = false;

        const fields = {
            IndexInPipeline__c:  this.indexId,
            ArticleUrl__c:  this.ArticleUrl__c ,
            Description__c: this.Description__c,
            thumbnailSrc: this.thumbnailSrc,
            videoTitle: this.videoTitle
        }
        console.log("SAVE : " + JSON.stringify(fields));
       /* this.dispatchEvent(new CustomEvent("savevideocardtiledata",{
            detail: { fields }
        })); */
    }
    handleCloseAction(event){
        this.editingCard = false;
    }
    handleDeleteAction(event)
    {
        this.dispatchEvent(new CustomEvent("deletecard",{detail:this.indexId}));
    }
}