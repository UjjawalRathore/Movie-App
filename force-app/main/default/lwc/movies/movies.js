import { LightningElement } from 'lwc';
import getMovies from '@salesforce/apex/MovieController.getMovies';
export default class Movies extends LightningElement {
  movies = [];
  pageNumber = 1;
  chosenView = 'showMovies';
  disablePrev = true;
  disableNext = false;
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
        this.disablePrev = false;
    }
    if (this.pageNumber === 12) {
      this.disableNext = true;
    }
  }

  previous() {
      if (this.pageNumber > 1) {
          this.pageNumber -= 1;
          this.getMyMovies();
          this.disableNext = false
      }
      if (this.pageNumber === 1) {
        this.disablePrev = true;
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

  get headerTitle(){
    if(this.showMovie){
      return 'Movie Detail';
    } else if (this.showActor){
      return 'Actor Detail';
    }
    return 'Movies';
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

  handleGoBack(event) {
    if(this.chosenView ==='showMovie'){
      this.chosenView='showMovies';
    }else if(this.chosenView ==='showActor'){
      this.chosenView = 'showMovie';
    }else{
      this.chosenView = 'showMovies';
    }
    console.log('handleGoBack');
}

}
