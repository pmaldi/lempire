import { Template } from 'meteor/templating';
import { ExportsCollection } from '../api/ExportsCollection';
import { ReactiveDict } from 'meteor/reactive-dict';
import './App.html';
import './Exports.js';

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  exports() {
    return ExportsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  }
});

Template.form.events({
  'submit .export-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Insert a export into the collection
    ExportsCollection.insert({
      percent: 0,
      createdAt: new Date(), // current time
    });
  },
});
