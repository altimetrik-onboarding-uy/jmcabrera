import { LightningElement,api,track } from 'lwc';

export default class VideoSearchCard extends LightningElement {

    @api indexInList = -1;
    @api thumbnailSrc = '';
    @api videoId = '';
    @api videoTitle = '';

    @track available = true;

    handleAddCardToList() {
        this.available = false;
        const data = new CustomEvent("addcardtolist",{
            detail: {
                indexInList : this.indexInList,
                thumbnailSrc : this.thumbnailSrc,
                videoId : this.videoId,
                videoTitle : this.videoTitle
            }
        });
        this.dispatchEvent(data);
    }
}