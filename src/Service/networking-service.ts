import axios from 'axios';
import {getData, insertData} from './datastore-service';
import {mergeMap} from "rxjs";
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
    return axios.get('https://api.stuv.app/rapla/lectures/' + course).then(res => {
      if (res) {
        const lecture:Lecture[] = res.data.map((lecture:Lecture)=>{
          const lect:Lecture = {
            id: lecture["id"],
            date: new Date(lecture["date"]),
            startTime: new Date(lecture["startTime"]),
            endTime: new Date(lecture["endTime"]),
            name: lecture["name"],
            type: lecture["type"],
            rooms: lecture["rooms"],
            course: lecture["course"]
          }
          return lect;
        })
        insertData('lectures',lecture)
        return lecture;
      } else {
        return null;
      }
    });
  },
};
