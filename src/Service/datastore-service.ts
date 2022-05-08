import AsyncStorage from '@react-native-async-storage/async-storage';

export const insertData = function (key:string,value:any) {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getData = function (key:string) {
  return AsyncStorage.getItem(key).then((res)=>{
    if (res) {
      return JSON.parse(res);
    } else {
      return null;
    }
  });
}
