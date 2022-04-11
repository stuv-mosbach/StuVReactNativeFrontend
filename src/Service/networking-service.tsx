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