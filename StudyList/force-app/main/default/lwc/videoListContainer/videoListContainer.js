/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class VideoListContainer extends LightningElement {

    @track availableVideoCards = [];
    @track listName = "";

    handleCloseMe() {
        this.dispatchEvent(new CustomEvent("closecideolistcontainer", {}));
    }
    handleSaveAddNewVideoCard(event) {
        
    }
    handleAddCardToList(event){
        let tempArray = [];
        this.availableVideoCards.forEach(value => {

            tempArray.push(value);
        });
        tempArray.push(
            {
                IndexInPipeline__c: (this.availableVideoCards.length),
                StudyList__c:'asd',
                ArticleUrl__c: event.detail.videoId,
                Description__c: '',
                thumbnailSrc : event.detail.thumbnailSrc,
                videoTitle : event.detail.videoTitle
            }
        );
       
        this.availableVideoCards = tempArray;
        this.showAddNewVideoCardModal = false;
    }
    handleListNameChange(event)
    {
        if(event.target.value)
        {
            this.listName = event.target.value;
        }
    }
    handleOpenAddNewVideoCardModal() {
        this.dispatchEvent(new CustomEvent("openaddnewvideocardmodal", {}));
        console.log("OPEN VIDEO TILE");
    }
    handleSave() {
        const closeme = new CustomEvent('saveaddnewvideocard',
            {
                detail: {
                  
                }
            }
        );
        this.dispatchEvent(closeme);
    }
    handleSaveTileCardData(event){
        this.availableVideoCards[event.detail.fields.IndexInPipeline__c].ArticleUrl__c = event.detail.fields.ArticleUrl__c;
        this.availableVideoCards[event.detail.fields.IndexInPipeline__c].Description__c = event.detail.fields.Description__c;
        this.availableVideoCards[event.detail.fields.IndexInPipeline__c].thumbnailSrc = event.detail.fields.thumbnailSrc;
        this.availableVideoCards[event.detail.fields.IndexInPipeline__c].videoTitle = event.detail.fields.videoTitle; 
    }
    handleDeleteListCard(event) {
        let tempArray = [];
        this.availableVideoCards.forEach(value => {

            tempArray.push(value);
        });
        tempArray.splice(event.detail, 1);
        for (const [index, value] of tempArray.entries()) {
            tempArray[index].IndexInPipeline = index;
        }
        this.availableVideoCards = tempArray;
    }
    handleSave(event){
        const listData = new CustomEvent("savestudylist",{
            detail: {
                studyList : {StudyListName__c : this.listName},
                studyTiles: this.availableVideoCards
            }
        });
        this.dispatchEvent(listData);
    }
}