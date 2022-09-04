import {Button, ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import {style} from "../util/Style";
import {Course, NetworkService} from "../Service/networking-service";
import CheckBox from '@react-native-community/checkbox';
import {insertData} from "../Service/datastore-service";

export function CourseSelecter() {
    const [courses,setCourse] = useState([] as Course[]);

    React.useEffect(()=>{
        NetworkService.getAllCourses().then((courses:Course[]|null)=>{
           if (courses) {
               setCourse(courses);
           }
        })
    },[])


    const saveSelectedAndReload = function () {
        let selectedCourse:string[] = []
        courses.forEach(course=>{
            if (course.selected) {
                selectedCourse.push(course.name)
            }
        });
        insertData("coursesSelected",selectedCourse);

    }


    return (
        <View style={style.container}>
            <Text style={style.h1}>Kurs selektieren</Text>
            <ScrollView style={style.innerScrollView}
            contentContainerStyle={style.innerContentContainer}>
                {courses.map((onCourse,index)=> {
                    return (
                    <View style={style.courseSelectCheckboxContainer}>
                        <View style={style.courseSelectContent}>
                            <Text style={[style.text,style.courseSelectText]}>{onCourse.name}</Text>
                            <CheckBox value={onCourse.selected} onValueChange={(value => {
                                setCourse(existingItems => {
                                    return [
                                        ...existingItems.slice(0,index),
                                        {
                                            selected:value,
                                            name: onCourse.name
                                        } as Course,
                                        ...existingItems.slice(index+1),
                                    ]
                                })
                            })}/>
                        </View>
                        <View style={style.divider}/>
                    </View>)

                })}
            </ScrollView>
            <View style={style.button}>
            <Button title={"Abschicken"} onPress={saveSelectedAndReload}/>
            </View>
        </View>
    )
}
