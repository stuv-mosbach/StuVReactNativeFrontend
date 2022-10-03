import {Button, ScrollView, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {style, theme} from "../util/Style";
import {Course, Lecture, NetworkService} from "../Service/networking-service";
import CheckBox from '@react-native-community/checkbox';
import {getData, insertData} from "../Service/datastore-service";
// @ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-root-toast";

export function CourseSelecter() {
    const [courses,setCourse] = useState([] as Course[]);
    const [shownCourses,setShownCourses] = useState([] as Course[])

    //loads all the courses opn startup of the component
    React.useEffect(()=>{
        NetworkService.getAllCourses().then((courses:Course[]|null)=>{
           if (courses) {
               getData("coursesSelected").then(res=>{
                   if (res) {
                       courses.forEach((course,index)=>{
                           if(res.includes(course.name)) {
                               courses[index].selected = true;
                           }
                       })
                   }
                   setCourse(courses);
                   setShownCourses(courses);
               })
           }
        })
    },[]);

    const saveSelectedAndReload = function () {
        let selectedCourse:string[] = []
        courses.forEach(course=>{
            if (course.selected) {
                selectedCourse.push(course.name)
            }
        });
        if (selectedCourse.length>0) {
            insertData("coursesSelected",selectedCourse);
            NetworkService.getLectures(selectedCourse.join(",")).then(
                (lecture: Lecture[] | null) =>{
                    if (lecture) {
                        insertData("lectures",lecture);

                    }
                }
            );
        } else {
            Toast.show("Bitte mindestens einen Kurs auswählen!")
        }


    }
    const searchInCourses = function (text:string) {
        console.log(text)
        let searchedCourses:Course[] = [];
        courses.forEach(elem => {
            if (elem.name.toLowerCase().includes(text.toLowerCase())) {
                searchedCourses.push(elem)
            }
        });
        setShownCourses(searchedCourses)
    }

    return (
        <View style={style.container}>
            <Text style={style.h1}>Kurs selektieren</Text>
            <View style={style.spaceRow}>
                <TextInput
                    style={style.inputSelectCourse}
                    editable={true}
                    placeholder={"Search"}
                    onChangeText={newText=>searchInCourses(newText)}
                />
                <View style={style.searchButton}>
                    <FontAwesome
                        name={"search"}
                        size={20}
                        color={theme.text}
                    />
                </View>

            </View>
            <ScrollView style={style.innerScrollView}
            contentContainerStyle={style.innerContentContainer}>
                {shownCourses.map((onCourse,index)=> {
                    return (
                    <View style={style.courseSelectCheckboxContainer} key={index}>
                        <View style={style.courseSelectContent}>
                            <Text style={[style.text,style.courseSelectText]}>{onCourse.name}</Text>
                            <CheckBox value={onCourse.selected} onValueChange={(value => {
                                setShownCourses(existingItems => {
                                    return [
                                        ...existingItems.slice(0,index),
                                        {
                                            selected:value,
                                            name: onCourse.name
                                        } as Course,
                                        ...existingItems.slice(index+1),
                                    ]
                                });
                                let indexCourse = courses.findIndex(elem =>onCourse.name=== elem.name);
                                if (indexCourse!=undefined) {
                                    setCourse(existingItems => {
                                        return [
                                            ...existingItems.slice(0,indexCourse),
                                            {
                                                selected:value,
                                                name: onCourse.name
                                            } as Course,
                                            ...existingItems.slice(indexCourse+1),
                                        ]
                                    });
                                }
                            })} tintColor={"#000"}/>
                        </View>
                        <View style={style.divider}/>
                    </View>)
                })}
            </ScrollView>
            <View style={style.button}>
            <Button color={theme.primary} title={"Speichern"} onPress={saveSelectedAndReload}/>
            </View>
        </View>
    )
}
