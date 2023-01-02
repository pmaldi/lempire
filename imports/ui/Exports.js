import { Template } from 'meteor/templating';
import { ExportsCollection } from '../api/ExportsCollection';

import './Exports.html';

/* It's a lifecycle hook that runs when the template is created. */
Template.export.onCreated(function () {
  const percent = Template.instance().data.percent;
  const id = Template.instance().data._id;
  const instance = this;

  this.progress = new ReactiveVar(percent);

  this.runEverySecond = setInterval(() => {
    const this_element = document.getElementById(id);
    if (this.progress.get() < 100 && this_element) {
      this.progress.set(this.progress.get() + 5);
      ExportsCollection.update(id, {
        $set: {
          percent: this.progress.get(),
        }
      });
      this_element.style.width = this.progress.get() + '%';
    }
    if (this.progress.get() == 100 && this_element) {
      clearInterval(this.runEverySecond);
      ExportsCollection.update(id, {
        $set: {
          link: randomLink(),
        }
      });
    }
  }, (1000));
});


Template.export.events({
  'click .delete'() {
    clearInterval(this.runEverySecond);
    ExportsCollection.remove(this._id);
  },
});


/**
 * A function that will return a random link from the array of links.
 */
const randomLink = function () {
  const links = ["https://www.lempire.com", "https://www.lemlist.com", "https://www.lemverse.com", "https://www.lemstash.com"];
  const random = Math.floor(Math.random() * links.length);
  return links[random];
}