public with sharing class MovieController {
    @AuraEnabled
    public static List<Film__c> getMovies(Integer offset){
        return [select id, Name, Original_Title__c, Original_Language__c, Genre__c,
                         Overview__c, PosterURL__c, Release_Date__c, Runtime_Minutes__c, Tagline__c
                from Film__c
                limit 9 offset :offset];
    }

      public static List<Cast_Member__c> getMovieDetails(String movieId){
        return [select id, Name, Actors_Id__r.Id, Actors_Id__r.Name, Actors_Id__r.Profile_Url__c
                    from Cast_Member__c
                where Film_Id__c = :movieId];
    }

	
}