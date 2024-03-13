public with sharing class CastController {
    @AuraEnabled
    public static List<Cast_Member__c> getCastMember(String selectedId) {
		return [select Name, Film_Id__c, Actors_Id__c, Actors_Id__r.Name, 
		Actors_Id__r.Birth_Day__c, Actors_Id__r.Birth_Place__c, 
		Actors_Id__r.Gender__c, Actors_Id__r.Profile_Url__c, 
		Actors_Id__r.Death_Day__c 
		FROM Cast_Member__c
        WHERE Film_Id__c = :selectedId];
	}

	@AuraEnabled(cacheable=true)
    public static List<Cast_Member__c> getActor(String selectedId) {
        return [
            SELECT Name, 
                   Film_Id__c, 
                   Actors_Id__c, 
                   Actors_Id__r.Name, 
                   Actors_Id__r.Birth_Day__c, 
                   Actors_Id__r.Birth_Place__c, 
                   Actors_Id__r.Gender__c, 
                   Actors_Id__r.Profile_Url__c, 
                   Actors_Id__r.Death_Day__c,
                   Actors_Id__r.Biography__c,
                   Actors_Id__r.Known_For__c
            FROM Cast_Member__c
            WHERE Actors_Id__c = :selectedId
        ];
    }
}