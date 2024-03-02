import { LightningElement, api } from 'lwc';

export default class MoviesList extends LightningElement {
  @api movies = [];


  showDetails(event){
    console.log(event.target.dataset.movieId);
    this.dispatchEvent(new CustomEvent('selectedmovie', {
      detail: event.target.dataset.movieId
    }))
  }
}