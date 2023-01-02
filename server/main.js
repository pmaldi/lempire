import { Meteor } from 'meteor/meteor';
import { ExportsCollection } from '/imports/api/ExportsCollection';

const insertExport = exportText => ExportsCollection.insert({ text: exportText, percent: 0, createdAt: new Date() });

Meteor.startup(() => {
  if (ExportsCollection.find().count() === 0) {
    [
      'First Export',
    ].forEach(insertExport);
  }
});
