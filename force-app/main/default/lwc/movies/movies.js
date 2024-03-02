import { LightningElement } from 'lwc';
import getMovies from '@salesforce/apex/MovieController.getMovies';
export default class Movies extends LightningElement {
  movies = [];
  pageNumber = 1;
  chosenView = 'showMovies';
  selectedMovie
  SelectedMovieId
  selectedActorId

  connectedCallback() {
    this.getMyMovies();
  }

  get showMovies() {
    if (this.chosenView === 'showMovies') {
      return true;
    }
    return false;
  }

  get showMovie() {
    if (this.chosenView === 'showMovie') {
      return true;
    }
    return false;
  }

  get showActor() {
    if (this.chosenView === 'showActor') {
      return true;
    }
    return false;
  }

  next() {
    if (this.pageNumber <= 11) {
        this.pageNumber += 1;
        this.getMyMovies();
    }
  }

  previous() {
      if (this.pageNumber > 1) {
          this.pageNumber -= 1;
          this.getMyMovies();
      }
  }

  async getMyMovies() {
    const movies = await getMovies({offset: this.getOffset()});
    this.movies = movies.map(mov => {
      const genres = mov.Genre__c.split(';').join(', ');
      const poster = mov.PosterURL__c.includes('undefined') ? null : mov.PosterURL__c;
      if (mov.Name !== mov.Original_Title__c) {
        return {...mov, Name: `${mov.Name} (${mov.Original_Title__c})`, Genre__c: genres, PosterURL__c: poster};
      } 
      return {...mov, Genre__c: genres, PosterURL__c: poster};
      
    })
    console.log(this.movies);
  }

  getOffset() {
    return (this.pageNumber - 1) * 9;
  }

  handleMovieSelected(event){
    this.SelectedMovieId = event.detail;
    this.selectedMovie = this.movies.find(movieId => movieId.Id === event.detail);
    console.log(JSON.stringify(this.selectedMovie));
    this.chosenView = 'showMovie';
  }

  handleActorSelected(event){
    this.selectedActorId = event.detail;
    this.selectedActor = this.movies.find(actorId => actorId.Id === event.detail);
    console.log('actorId------------>',this.selectedActorId);
    this.chosenView = 'showActor'
  }

}
