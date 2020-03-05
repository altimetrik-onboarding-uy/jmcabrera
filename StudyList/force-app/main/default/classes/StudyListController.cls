public without sharing class StudyListController {
   
    @AuraEnabled
    public static void createStudyListCardTile(List<StudyCard__c> scope)
    {
        System.debug('SCOPE  ' + scope);
        if(scope != null && scope.size() >= 1)
        {
            System.debug('SCOPE  not null');
            insert scope;
        }
    }

    @AuraEnabled
    public static Map<String, Object> makeGetCallout(String searchWord) {
        Map<String, Object> result = null;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String accessKey = 'AIzaSyDAF2ws5K1_LiORfdawfz9T6pK9GR3P8rQ';
        request.setEndpoint('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+searchWord+'&key='+accessKey+'&maxResults=10');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            result = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
        }
        return result;
    }
}
  
