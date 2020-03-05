import { LightningElement, track } from 'lwc';
import createStudyListCardTile from '@salesforce/apex/StudyListController.createStudyListCardTile';

import { createRecord } from 'lightning/uiRecordApi';
import STUDYLIST_OBJECT from '@salesforce/schema/StudyList__c';
import STUDYLIST_NAME from '@salesforce/schema/StudyList__c.Name';

export default class MainContainer extends LightningElement {
    @track showAddNewStudyList = false;

    handleOpenAddNewVideoCardModal(){
        this.showAddNewVideoCardModal = true;
    }

    handleCloseAddNewVideoCard(){
        this.showAddNewVideoCardModal = false;
    }
    handleOpenCreateStudyList(){
        this.showAddNewStudyList = true;
    }
    handleCloseVideoListContainer(){
        this.showAddNewStudyList = false;
    }

    handleSaveStudyList(event)
    {
        let tempListObj = event.detail.studyList;
        
        const fields = {};
        fields[STUDYLIST_NAME.fieldApiName] = tempListObj.StudyListName__c;
        const recordInput = { apiName : STUDYLIST_OBJECT.objectApiName,fields};
        createRecord(recordInput)
        .then(studylist => {
            let studyListId = studylist.id;
            let tempArray = event.detail.studyTiles;
            tempArray.forEach(element => {
                
                element.StudyList__c = studyListId;
            });
            createStudyListCardTile({scope : tempArray})
            .then(() => {
                console.log("List tiles saved");
                this.showAddNewStudyList = false;
            })
            .catch(error => {console.error("ERROR SAVING TILES : " + error.body.message)});
        })
        .catch(error => {console.error("ERROR SAVING LIST : " + error.body.message)});
    }
}