public with sharing class MovieController {
    @AuraEnabled
    public static List<Film__c> getMovies(){
        return [select id, Name, Original_Title__c, Original_Language__c, Genre__c,
                         Overview__c, PosterURL__c, Release_Date__c, Runtime_Minutes__c
                from Film__c
                limit 9];
    }
}