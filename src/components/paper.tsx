import {Button, Text, View} from "react-native";
import {style, theme} from "../util/Style";
import React from "react";


export function Paper({ navigation }: any) {
    return (
        <View style={style.container}>
            <Text style={style.h1}>StuV Companion</Text>
            <Text>2019 Verfasste Studierenschaft</Text>
            <Text style={style.h3}>Haftungsausschluss</Text>
            <Text style={style.textSecondary}>
                Die Informationen auf der Website und der StuV Companion App dient nur zu allgemeinen Informationszwecken.
                Die Verfasste Studierenschaft übernimmt keine Verantwortung für Fehler oder Auslassungen in den Inhalten auf der Website.
                In keinem Fall wird eine Haftung für spezielle, direkte, indirekte oder Folgeschäden übernommen,
                oder zufällige Schäden oder Schäden jeglicher Art, sei es in einer Klage von
                Vertrag, Fahrlässigkeit oder andere unerlaubte Handlung, die sich aus oder im Zusammenhang mit der
                der Nutzung des Dienstes oder des Inhalts des Dienstes. Die behält Verfasste Studierenschaft sich das Recht vor, eine
                Hinzufügung, Löschung oder Änderung der Inhalte des Dienstes an irgendeiner Stelle ohne vorherige Ankündigung vorzunehmen.
            </Text>
            <Text style={style.h3}>Haftungsausschluss für externe Links</Text>
            <Text style={style.textSecondary}>
                Website und StuV Companion mobile App können Links zu externen Websites enthalten.
                die nicht von oder in irgendeiner Weise mit dem Unternehmen verbunden sind.
                Bitte beachten Sie, dass die Firma keine Garantie für die Richtigkeit, Aktualität und Aktualität übernimmt,
                oder die Vollständigkeit der Informationen auf diesen externen Websites.
                Durch das Fortfahren bestätigen Sie, dass Sie den Haftungsausschluss gelesen haben und diesem zustimmen.
            </Text>
            <View style={style.button}>
                <Button color={theme.primary} title={"Fortfahren"} onPress={()=>{navigation.navigate('courseSelect')}} />
            </View>
        </View>
    )
}
