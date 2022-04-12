import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line prettier/prettier
export const insertData = function (key:string,value:any) {
  AsyncStorage.setItem(key, JSON.stringify(value));
  AsyncStorage.getItem(key).then(res => {
    console.log(res);
    console.log("----------------");
  });
};
