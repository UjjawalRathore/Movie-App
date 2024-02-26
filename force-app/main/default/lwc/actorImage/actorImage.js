import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
  'Actors__c.Profile_Url__c',
  'Actors__c.Name'
];

export default class ActorPic extends LightningElement {
  @api recordId;
  profileUrl; //will be null if profile url is not set
  name;
  @wire(getRecord, {recordId: '$recordId', fields: FIELDS})
    wiredRecord({data}) {
      if (data) {
        this.profileUrl = data.fields.Profile_Url__c.value;
        this.name = data.fields.Name.value;
        console.log(this.profileUrl);
      }
    }
  get validUrl() {
    if (this.profileUrl) {
      return true;
    }
    return false;
  }
}