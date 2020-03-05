import { LightningElement, track } from 'lwc';
import makeGetCallout from '@salesforce/apex/StudyListController.makeGetCallout';

export default class VideoSearchBar extends LightningElement {

    @track availableVideoResults = [];

    @track resultList = [];
    @track resultVideoIds = [];
    @track resultThumbnails = [];

    @track searchTerm;

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;
    }
    handleAddCardToList(event) {
        const data = new CustomEvent("addcardtolist", {
            detail: {
                indexInList: event.detail.indexInList,
                thumbnailSrc: event.detail.thumbnailSrc,
                videoId: event.detail.videoId,
                videoTitle: event.detail.videoTitle
            }
        });
        this.dispatchEvent(data);
    }

    showValues() {
        let map;
        let mapItems;

        makeGetCallout({ searchWord: this.searchTerm })
            .then(result => {
                this.resultList = result;
                map = this.resultList;
                mapItems = map["items"];
                
                Object.keys(mapItems).forEach(x => {
                    if(mapItems[x]["id"]["videoId"] !== undefined)
                    {
                        this.availableVideoResults.push({
                            videoId: mapItems[x]["id"]["videoId"],
                            thumbnailSrc: mapItems[x]["snippet"]["thumbnails"]["default"]["url"],
                            videoTitle : mapItems[x]["snippet"]["title"]
                         });
                    }
                });
               
            })
            .catch((error) => {
                console.log("error : " + error.body.message);
            });
    }
}