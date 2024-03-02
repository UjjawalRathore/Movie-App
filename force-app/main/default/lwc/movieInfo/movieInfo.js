import { LightningElement, api } from 'lwc';
// import getMovieDetails from '@salesforce/apex/MovieController.getMovieDetails';
import getCastMember from '@salesforce/apex/CastController.getCastMember'

export default class MovieInfo extends LightningElement {
    @api movie;
    @api movieId;
    movieDetail = [];
    castMemberList=[];

    connectedCallback(){
        this.getCast()
    }

    async getCast() {
    
            this.castMemberList = await getCastMember({ selectedId: this.movieId });
            console.log('Cast Member List:', this.castMemberList);
    }
    
    
    
    handleActorClick(event){
        const actorId = event.currentTarget.dataset.actorId;
        this.dispatchEvent(new CustomEvent('actorclick', {
            detail: actorId
        }))
    }
    
    // get selectedMovie() {
    //     return this.moviesList.find(movie => movie.Id === this.movieId);
    // }

    get formattedReleaseDate() {
        if (this.movie && this.movie.Release_Date__c) {
            const releaseDate = new Date(this.movie.Release_Date__c);
            const day = ('0' + releaseDate.getDate()).slice(-2);
            const month = ('0' + (releaseDate.getMonth() + 1)).slice(-2);
            const year = releaseDate.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return '';
    }
    

    
}