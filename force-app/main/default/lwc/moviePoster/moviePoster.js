import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
  'Film__c.PosterURL__c',
  'Film__c.Name'
];

export default class MoviePoster extends LightningElement {
  @api recordId;
  posterUrl; //will be null if profile url is not set
  name;
  @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    wiredRecord({data}) {
      if (data) {
        this.posterUrl = data.fields.PosterURL__c.value;
        this.name = data.fields.Name.value;
        console.log(this.posterUrl);
      }
    }
  get validUrl() {
    if (this.posterUrl) {
      return true;
    }
    return false;
  }
}