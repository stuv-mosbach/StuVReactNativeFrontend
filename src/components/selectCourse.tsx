import {Button, ScrollView, Text, View} from "react-native";
import React, {useState} from "react";
import {style} from "../util/Style";
import {Course, NetworkService} from "../Service/networking-service";
import CheckBox from '@react-native-community/checkbox';

export function CourseSelecter() {
    const [courses,setCourse] = useState([] as Course[]);
    const [test,setTest] = useState(false)

    React.useEffect(()=>{
        NetworkService.getAllCourses().then((courses:Course[]|null)=>{
           if (courses) {
               setCourse(courses);
           }
        })
    })
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

                            })}/>
                        </View>
                        <View style={style.divider}/>
                    </View>)

                })}
            </ScrollView>
            <View style={style.button}>
            <Button title={"Abschicken"}/>
            </View>
        </View>
    )
}
