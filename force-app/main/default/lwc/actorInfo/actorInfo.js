import { LightningElement, api } from 'lwc';
import getActor from '@salesforce/apex/CastController.getActor';

export default class ActorDetails extends LightningElement {
    @api actorId;
    @api actor;
    findActor;

    connectedCallback() {
        this.getActorDetail();
    }

    async getActorDetail() {
        try {
            this.actor = await getActor({ selectedId: this.actorId });
            console.log('Actor Detail:', this.actor);
            this.findActor = this.actor[0];
            console.log('find actor----->', this.findActor);
        } catch (error) {
            console.error('Error fetching actor details:', error);
        }
    }

    



    // get selectedActor() {
    //     if (this.movieCast && this.movieCast.length > 0) {
    //         return this.movieCast.find(cast => cast.ActorId__c === this.actorId);
    //     }
    //     return null;
    // }
    
}