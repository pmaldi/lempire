import { Template } from 'meteor/templating';
import { ExportsCollection } from '../api/ExportsCollection';
import { ReactiveDict } from 'meteor/reactive-dict';
import './App.html';
import './Exports.js';

/* It's a callback that runs when the template is created. */
Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  exports() {
    /* It's a MongoDB query that returns all the exports in the collection, sorted by the
    createdAt field in descending order. */
    return ExportsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  }
});

Template.form.events({
  /* It's a callback that runs when the form is submitted. */
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
