import React, {useEffect, useState, useCallback} from 'react';
import {
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CalenderEntry from '../components/CalenderEntry';
import {style} from '../util/Style';
import {Lecture, NetworkService} from '../Service/networking-service';
import {getData} from '../Service/datastore-service';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-root-toast';

/** TODO:
 - change color of text of klausur Lectures
 - filter holiday days?
 */

export default function Home({navigation}: any) {
    /**
     * this function filters the list so only today, tomorrow is shown
     * or if it is friday or saturday it shows the Lectures of monday
     */
    const filterList = function (toFilterList: Lecture[]) {
        let filterTime = new Date();
        //filters the list where the end is greater than current time --> you get all current that are left on the day
        const today = toFilterList.filter(item => {
            if (item.date.getTime() < filterTime.getTime()) {
                return item.endTime.getHours() >= filterTime.getHours();
            }
            return false;
        });
        // if there are non the next day is selected
        if (today.length == 0) {
            let tomorrowDate = new Date();
            //set to zero to have an mid night stand
            tomorrowDate.setHours(0, 0, 0, 0);
            //+2 to set from yesterday midnight to tomorrow midnight
            tomorrowDate.setDate(filterTime.getDate() + 2);
            //filter everything that is greater than cvurrent time so only the next day is shown
            let tomorrow: Lecture[] = toFilterList.filter(item => {
                return (
                    item.startTime.getTime() > filterTime.getTime() &&
                    item.endTime.getTime() < tomorrowDate.getTime()
                );
            });
            //if it is friday then the next day is also zero so it is looked whether there is something between the time
            if (tomorrow.length == 0 && filterTime.getDay() >= 5) {
                tomorrowDate.setDate(tomorrowDate.getDate() + 2);

                tomorrow = toFilterList.filter(item => {
                    return (
                        item.startTime.getTime() > filterTime.getTime() &&
                        item.endTime.getTime() < tomorrowDate.getTime() &&
                        item.date.getDay() == 1
                    );
                });
                //sets header accordingly so there is the right text at the top
                setHeader('Nächste Vorlesungen');
                return tomorrow;
            } else {
                setHeader('Morgige Vorlesungen');
                return tomorrow;
            }
        } else {
            setHeader('Heutige Vorlesung');
            return today;
        }
    };
    const [lectures, setLectures] = useState([] as Lecture[]); /// State for lectures that are shown
    const [refreshing, setRefreshing] = useState(false); //for refreshing when reloading the site
    const [header, setHeader] = useState('Heutige Vorlesungen'); //the header

    const onRefresh = useCallback(() => {
        // on refresh it shows the refresh button, then if it gets the right lecture it filters the list and then turns of the refresh
        setRefreshing(true);
        NetInfo.fetch().then(netstate => {
            if (netstate.isConnected) {
                NetworkService.getLectures('MOS-TINF21A').then(
                    (lecture: Lecture[] | null) => {
                        if (lecture) {
                            setLectures(filterList(lecture));
                            setRefreshing(false);
                        }
                    },
                );
            } else {
                let toast = Toast.show('Sie sind nicht zum Internet verbunden');
                setRefreshing(false);
            }
        });
    }, []);

    //on startup it loads automatically the Data from async storatge so that it can be viewed in offline mode
    useEffect(() => {
        getData('lectures').then(lectureList => {
            if (lectureList) {
                const lect: Lecture[] = lectureList.map((lecture: Lecture) => {
                    const lec: Lecture = {
                        ...lecture,
                        date: new Date(lecture.date),
                        startTime: new Date(lecture.startTime),
                        endTime: new Date(lecture.endTime),
                    };
                    return lec;
                });
                setLectures(filterList(lect));
            }
        });
    }, []);

    return (
        <ScrollView
            style={style.scrollViewStyle}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
            <Text style={style.header}>{header}</Text>

            {lectures.length == 0 ? (
                <Text>Keine Vorlesungen in nächster Zeit</Text>
            ) : (
                <></>
            )}
            {lectures.map(lecture => {
                return <CalenderEntry {...lecture} />;
            })}
        </ScrollView>
    );
}
