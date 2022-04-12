import Datastore from 'react-native-local-mongodb';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const db = new Datastore({ filename: 'offlineData', autoload: true,storage:AsyncStorage });

// eslint-disable-next-line prettier/prettier
export const insertData = function (document:any) {
  let t = db.insert(document, function (err, newDocs) {});
  console.log(t);
};
