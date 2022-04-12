import axios from 'axios';
import { insertData } from './datastore-service';
export interface Course {
  name: string;
}
export interface Lecture {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  name: string;
  type: string;
  rooms: string[];
  course: string;
}
export const NetworkService = {
  getLectures: function (course: string, start?: Date, end?: Date) {
    axios.get('https://api.stuv.app/rapla/lectures/' + course).then(res => {
      insertData('lectures', res.data);
    });
  },
};
